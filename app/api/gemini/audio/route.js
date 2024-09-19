'use server';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import fs from 'fs'; // Import the file system module

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Initialize a Gemini model appropriate for your use case.
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

// Function to send audio to Gemini
export async function sendAudioToGemini(audioUrl) {
  try {
    // Fetch the audio file from the URL
    const response = await axios({
      url: audioUrl,
      method: 'GET',
      responseType: 'arraybuffer', // Important to get the raw binary data
    });

    // Convert the response data to a Buffer
    const audioBuffer = Buffer.from(response.data);

    // Save the buffer to a temporary file
    const tempFilePath = 'temp_audio.mp3';
    fs.writeFileSync(tempFilePath, audioBuffer);

    // Create an instance of GoogleAIFileManager
    const fileManager = new GoogleAIFileManager(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY
    ); // Replace with your actual API key

    // Use the path to the temporary file
    const fileId = await fileManager.uploadFile(tempFilePath, {
      mimeType: 'audio/mp3', // Ensure MIME type matches the audio format
      fileName: 'audio.mp3', // Provide a valid filename
    });

    // Optionally delete the temp file after uploading
    fs.unlinkSync(tempFilePath);

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: fileId.file.mimeType,
          fileUri: fileId.file.uri,
        },
      },
      { text: `You are a mental health Chatbot that helps users with their mental health analyze the speech and provide advice, resources, and support to users who are struggling with mental health issues. Be emphateic and supportive in your responses . Speak in the tone of a mental health professional . Use kind and encouraging language. If you detect the user is speaking a some other language then respond in that language and do not say sorry that you don't know that language . Don't apologize every time. ` },
    ]);

    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error('Error sending audio to Gemini API:', error);
  }
}
