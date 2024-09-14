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
      const modelPrompt = `You are a mental health Chatbot that helps users with their mental health. You can provide advice, resources, and support to users who are struggling with mental health issues. Be emphateic and supportive in your responses . Speak in the tone of a mental health professional . Use kind and encouraging language. If you detect the user is speaking a some other language then respond in that language and do not say sorry that you don't know that language . Don't apologize every time. The user says: ${prompt}`;
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
