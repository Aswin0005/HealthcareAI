// app/api/mood-prediction/route.js
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase';

const HUGGING_FACE_API_KEY = process.env.NEXT_PUBLIC_HF;
const HUGGING_FACE_MODEL = 'nlptown/bert-base-multilingual-uncased-sentiment'; // Example model

// Mapping from star ratings to emotional categories
const sentimentMapping = {
  '1 star': 'Very Negative / Sad',
  '2 stars': 'Negative / Upset',
  '3 stars': 'Neutral / Indifferent',
  '4 stars': 'Positive / Happy',
  '5 stars': 'Very Positive / Joyful',
};

export async function POST(req) {
  try {
    const { text } = await req.json();

    // Ensure the input text is a string
    if (typeof text !== 'string' || text.trim() === '') {
      return NextResponse.json(
        { error: 'Text input must be a non-empty string' },
        { status: 400 }
      );
    }

    // Debugging logs
    console.log('Type of text:', typeof text);
    console.log('Text:', text);

    // Call Hugging Face API for sentiment analysis
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${HUGGING_FACE_MODEL}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    // Check the response status and log any errors
    if (!response.ok) {
      const errorDetail = await response.text();
      console.error('Hugging Face API error details:', errorDetail);
      throw new Error(
        `Hugging Face API request failed with status ${response.status}`
      );
    }

    const result = await response.json();
    console.log('Result', result);

    // Extract the highest score and its corresponding label
    const highestScore = result[0]?.reduce(
      (max, item) => (item.score > max.score ? item : max),
      { score: -Infinity }
    );
    const sentiment = highestScore.label || 'Neutral';

    // Map the star rating to a detailed sentiment
    const detailedSentiment = sentimentMapping[sentiment] || 'Unknown';

    // Store analysis result in Firestore
    await addDoc(collection(db, 'moodAnalysis'), {
      text,
      mood: detailedSentiment,
      timestamp: new Date(),
    });

    return NextResponse.json({ mood: detailedSentiment }, { status: 200 });
  } catch (error) {
    console.error('Error in mood prediction:', error);
    return NextResponse.json(
      { error: 'Mood prediction failed' },
      { status: 500 }
    );
  }
}
