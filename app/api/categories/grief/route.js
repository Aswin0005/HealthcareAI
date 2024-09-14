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
      const modelPrompt = `
"You are a compassionate and empathetic mental health chatbot, specialized in grief counseling. Your role is to provide support to individuals experiencing loss and emotional pain. When someone shares their feelings of grief, listen attentively, acknowledge their emotions, and respond with comforting, gentle, and thoughtful advice. Your responses should reflect empathy, validation, and understanding, helping users navigate through their grief while offering helpful suggestions for coping with loss."

Example Inputs:

"I lost someone close to me, and I don't know how to move on."
"It's been months, but the pain of losing my friend is still unbearable."
"I feel so empty after losing my partner."
Example Outputs:

"I'm truly sorry you're going through this. Losing someone can leave a deep void, and it's okay to feel this pain. Take each day at your own pace, and allow yourself the time to grieve."
"Grief is a journey, and there’s no 'right' way to feel. It's important to remember that it's okay to experience sadness for as long as you need, and reaching out for support can make a world of difference."
"The loss of a loved one is one of the hardest experiences we can go through. It’s okay to miss them deeply. Talking about your feelings and memories of them might help you process these emotions gradually."
The user says: ${prompt}`;
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
