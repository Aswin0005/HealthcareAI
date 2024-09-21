from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
from transformers import BertTokenizer, BertForSequenceClassification, AutoTokenizer, AutoModelForSequenceClassification
from torch.nn.functional import softmax
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if your frontend is hosted elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load pre-trained emotion BERT model and tokenizer
model_name = "bhadresh-savani/bert-base-uncased-emotion"
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForSequenceClassification.from_pretrained(model_name)

# Load pre-trained toxic BERT model and tokenizer
toxic_model_name = "unitary/toxic-bert"
toxic_tokenizer = AutoTokenizer.from_pretrained(toxic_model_name)
toxic_model = AutoModelForSequenceClassification.from_pretrained(toxic_model_name)

# Define categories and keywords for emotion classification
categories = ["stress", "depression", "trauma", "relationship", "grief", "finance", "health", "anxiety", "normal", "happy"]
keywords = {
    "stress": ["overwhelmed", "stress", "stressed", "pressure"],
    "depression": ["down", "hopeless", "depressed", "sad"],
    "trauma": ["accident", "trauma", "traumatic", "abuse"],
    "relationship": ["partner", "relationship", "arguing", "breakup"],
    "grief": ["miss", "loss", "grief", "grieving", "lonely"],
    "finance": ["financial", "money", "debt", "bills"],
    "health": ["health", "sick", "illness", "disease"],
    "anxiety": ["anxious", "anxiety", "nervous", "worry"],
    "normal": ["fine", "okay", "normal"],
    "happy": ["happy", "content", "joyful", "excited"]
}

class Responses(BaseModel):
    responses: list

class TextRequest(BaseModel):
    text: str
    threshold: float = 0.3

@app.post("/classify")
async def classify(responses: Responses):
    # Concatenate all responses into a single text
    text = " ".join(responses.responses)

    # Initialize score dictionary
    scores = {category: 0 for category in categories}

    # Check for keywords first
    for category, words in keywords.items():
        if any(word in text.lower() for word in words):
            scores[category] += 1  # Increment score for matched category

    # Find the category with the highest score
    max_category = max(scores, key=scores.get)

    # If no keywords found, use AI model
    if scores[max_category] == 0:
        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
        outputs = model(**inputs)
        probs = softmax(outputs.logits, dim=1)
        category_index = torch.argmax(probs, dim=1).item()
        return {"category": categories[category_index], "keywords": None}  # No specific keywords matched

    matched_keywords = [word for word in keywords[max_category] if word in text.lower()]
    return {"category": max_category, "keywords": matched_keywords}

@app.post("/analyze-text/")
async def analyze_text(request: TextRequest):
    inputs = toxic_tokenizer(request.text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = toxic_model(**inputs)
    probs = torch.sigmoid(outputs.logits)[0]

    labels = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]
    toxicity_scores = {label: prob.item() for label, prob in zip(labels, probs)}
    unsafe = any(score > request.threshold for score in toxicity_scores.values())

    print(toxicity_scores)
    return {"safe": not unsafe, "toxicity_scores": toxicity_scores}

@app.get("/")
def read_root():
    return {"message": "AI Classification API is running."}
