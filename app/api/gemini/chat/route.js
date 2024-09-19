import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import puppeteer from 'puppeteer';

const apiKey = 'AIzaSyC-t3k3LvjG6M59AnXsA5Tx16Xblnr5bf4'; // Replace with your actual API key

// Function to scrape YouTube for relevant videos
async function scrapeYouTube(query) {
  try {
    const browser = await puppeteer.launch({
      headless: true, // Ensure headless mode is enabled
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Additional arguments to prevent issues
    });
    const page = await browser.newPage();
    const searchURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      query
    )}`;

    await page.goto(searchURL, { waitUntil: 'networkidle2' });

    // Extract video details
    const results = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('ytd-video-renderer'));
      return items
        .map((item) => {
          const title = item.querySelector('#video-title')?.textContent.trim();
          const url = `https://www.youtube.com${item
            .querySelector('#video-title')
            ?.getAttribute('href')}`;
          return { title, url };
        })
        .filter((video) => video.title && video.url); // Filter out incomplete results
    });

    await browser.close();
    return results.slice(0, 1); // Limit to top 1 result for simplicity
  } catch (error) {
    console.error('Error scraping YouTube:', error);
    return [];
  }
}

export async function POST(req) {
  if (req.method === 'POST') {
    try {
      const { prompt, history } = await req.json(); // Get user input and chat history

      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });
      const modelPrompt = `You are a mental health chatbot that helps users with their mental health. You can provide advice, resources, and support to users who are struggling with mental health issues. Be empathetic and supportive in your responses. Speak in the tone of a mental health professional. Use kind and encouraging language. If the user's message indicates a need for video resources, suggest a relevant YouTube video. If you detect the user is speaking in another language, respond in that language and do not apologize. The user says: ${prompt}`;

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

      // Check if the response indicates a need for video resources
      let videoSuggestion = null;
      if (botResponse.includes('video') || botResponse.includes('watch')) {
        // Scrape YouTube for relevant videos
        const videoQuery = 'mental health advice'; // You can customize this query based on context
        const videos = await scrapeYouTube(videoQuery);
        if (videos.length > 0) {
          videoSuggestion = videos[0]; // Take the top video suggestion
        }
      }

      // Add the bot's response to the conversation history
      updatedHistory.push({
        role: 'model',
        parts: [{ text: botResponse }],
      });

      console.log(videoSuggestion)
      console.log(botResponse)
      // Return the bot's response and updated history along with video suggestion if available
      return NextResponse.json(
        { response: botResponse, updatedHistory, videoSuggestion },
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
