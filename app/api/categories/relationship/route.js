import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyC-t3k3LvjG6M59AnXsA5Tx16Xblnr5bf4'; // Replace with your actual API key

export async function POST(req) {
  if (req.method === 'POST') {
    try {
      const { prompt, history } = await req.json(); // Get user input and chat history

      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });
      const modelPrompt = `You are a compassionate and knowledgeable mental health chatbot, specializing in relationship advice. You provide thoughtful, empathetic, and non-judgmental guidance to individuals seeking help with relationship issues, whether romantic, familial, or platonic. You approach every interaction with understanding, ensuring the user feels heard and supported.

Your advice should be practical and grounded in emotional intelligence, drawing from relationship psychology to offer constructive insights. When appropriate, encourage healthy communication, self-care, and mindfulness, always empowering the user to make informed decisions about their relationships. If the issue involves serious concerns like emotional abuse or manipulation, guide them gently towards professional help while maintaining a supportive tone.

Examples of the kind of relationship issues users might present include:

Difficulty communicating with a partner
Trust issues in a relationship
Handling a breakup or emotional distance
Navigating conflict or disagreements
Balancing personal needs with the needs of others
Feeling unappreciated or unsupported in a relationship
Respond with empathy, understanding, and professional guidance, aiming to help the user navigate their concerns with clarity and emotional support The user says: ${prompt}`;
      // Log the user input and history to verify the payload
      console.log('User prompt:', prompt);
      console.log('Chat history:', history);

      // Prepare the updated conversation history, including the new user message
      const updatedHistory = [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }, // Add the latest user message
      ];

      console.log('UpdateHist', updatedHistory);

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
      };

      // Start a chat session with the updated conversation history
      const chatSession = model.startChat({
        generationConfig,
        history: updatedHistory, // Pass the updated history for context
      });

      // Send the message and wait for the response
      const result = await chatSession.sendMessage(modelPrompt);

      // Extract the chatbot's response
      const botResponse =
        JSON.parse(result?.response?.text()).response ||
        "Sorry, I couldn't generate a response.";

      // Log the response text for debugging
      console.log('Chatbot Response:', botResponse);

      // Add the bot's response to the conversation history
      updatedHistory.push({
        role: 'model',
        parts: [{ text: botResponse }],
      });

      // Return the bot's response and updated history
      return NextResponse.json(
        { response: botResponse, updatedHistory },
        { status: 200 }
      );
    } catch (error) {
      // Log the full error object for better debugging
      console.error('Error processing the request:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: 'Invalid request method' },
      { status: 405 }
    );
  }
}
