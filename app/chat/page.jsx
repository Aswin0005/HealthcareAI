'use client';
import { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  Timestamp,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  setDoc,
  
} from 'firebase/firestore';
import { storage, db } from '../../firebase';
import { sendAudioToGemini } from '../api/gemini/audio/route';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [botResponseLoading, setBotResponseLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Get the current user ID
  const userId = 'user123';

  // Ensure user is logged in
  if (!userId) {
    return <div>Please log in to use the chatbot.</div>;
  }

  // Get today's date as a string to use as the document ID
  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  };

  // Function to start recording audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/mp3',
        });
        uploadAudioToFirebase(audioBlob);
        audioChunksRef.current = []; // Clear the audio chunks
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  // Function to stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Function to upload audio to Firebase
  const uploadAudioToFirebase = async (audioBlob) => {
    const audioFileName = `audio_${Date.now()}.mp3`;
    const audioRef = ref(storage, `audio/${audioFileName}`);

    try {
      // Upload audio to Firebase Storage
      const snapshot = await uploadBytes(audioRef, audioBlob);

      // Get the download URL for the uploaded audio file
      const audioURL = await getDownloadURL(snapshot.ref);

      // Send audio URL to Gemini API
      const geminiResponse = await sendAudioToGemini(audioURL);
      console.log(geminiResponse);

      // Update chat history with audio message and Gemini response
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        {
          role: 'user',
          parts: [{ text: 'Audio message:', audioUrl: audioURL }],
        },
        { role: 'model', parts: [{ text: geminiResponse }] },
      ]);

      // Save the conversation to Firestore under user's daily subcollection
      await updateChatHistoryInFirestore(
        'Audio message',
        geminiResponse,
        audioURL
      );

      console.log('Audio uploaded successfully:', audioURL);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  // Function to update chat history in Firestore
  const updateChatHistoryInFirestore = async (
    userMessage,
    botResponse,
    audioUrl = null
  ) => {
    const todayDateString = getTodayDateString();

    // Reference to the daily document
    const dailyDocRef = doc(db, `users/${userId}/chatHistory`, todayDateString);

    try {
      const dailyDoc = await getDoc(dailyDocRef);

      if (dailyDoc.exists()) {
        // Document exists, update the chatHistory array
        await updateDoc(dailyDocRef, {
          chatHistory: arrayUnion({
            userMessage,
            botResponse,
            audioUrl,
            timestamp: Timestamp.fromDate(new Date()),
          }),
        });
      } else {
        // Document does not exist, create it with the chatHistory array
        await setDoc(dailyDocRef, {
          chatHistory: [
            {
              userMessage,
              botResponse,
              audioUrl,
              timestamp: Timestamp.fromDate(new Date()),
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error updating chat history in Firestore:', error);
    }
  };

  // Function to send user message and history to the server
  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChatHistory = [
      ...chatHistory,
      { role: 'user', parts: [{ text: message }] },
      { role: 'model', parts: [{ text: 'loading...' }] },
    ];

    setChatHistory(newChatHistory);
    setBotResponseLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: message,
          history: chatHistory,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const finalUserMessage = message;
        const finalBotResponse = data.response;

        // Update chat history state
        setChatHistory((prevChatHistory) => {
          const updatedChatHistory = [...prevChatHistory];
          updatedChatHistory.pop(); // Remove the 'loading...' placeholder
          return [
            ...updatedChatHistory,
            { role: 'model', parts: [{ text: finalBotResponse }] },
          ];
        });

        // Save the conversation to Firestore under user's daily subcollection
        await updateChatHistoryInFirestore(finalUserMessage, finalBotResponse);

        setBotResponseLoading(false);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = [...prevChatHistory];
        updatedChatHistory.pop(); // Remove the 'loading...' placeholder
        return [
          ...updatedChatHistory,
          {
            role: 'model',
            parts: [{ text: 'Error: Unable to get response.' }],
          },
        ];
      });
      setBotResponseLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="chatbox mb-4 h-[80%] overflow-y-scroll no-scrollbar border border-gray-300 p-4">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`message mb-2 flex items-center ${
              chat.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {chat.role === 'model' && (
              <img
                src="/bot.jpg"
                alt="Bot"
                className="w-8 h-8 mr-2 rounded-full"
              />
            )}

            <div
              className={`inline-block p-2 rounded-md max-w-[50%] ${
                chat.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              {chat.parts[0].text}
              {chat.parts[0].audioUrl && (
                <audio controls>
                  <source src={chat.parts[0].audioUrl} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>

            {chat.role === 'user' && (
              <img
                src="/avatar.jpeg"
                alt="User"
                className="w-8 h-8 ml-2 rounded-full"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex h-12">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md text-black"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={botResponseLoading}
        >
          Send
        </button>
      </div>

      <div className="mt-4 flex">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
