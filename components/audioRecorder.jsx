'use client';
import { useState, useRef } from 'react';
import {  ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';


const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [botResponseLoading, setBotResponseLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
    const audioFileName = `audio_${Date.now()}.wav`;
    const audioRef = ref(storage, `audio/${audioFileName}`);

    try {
      // Upload audio to Firebase Storage
      const snapshot = await uploadBytes(audioRef, audioBlob);

      // Get download URL and save metadata to Firestore
      const audioURL = `gs://${snapshot.metadata.bucket}/${snapshot.metadata.fullPath}`;
      await addDoc(collection(firestore, 'audioFiles'), {
        url: audioURL,
        timestamp: new Date(),
      });

      console.log('Audio uploaded successfully:', audioURL);
    } catch (error) {
      console.error('Error uploading audio:', error);
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
      const res = await fetch('/api/categories/relationship', {
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
        setChatHistory((prevChatHistory) => {
          const updatedChatHistory = [...prevChatHistory];
          updatedChatHistory.pop();
          return [
            ...updatedChatHistory,
            { role: 'model', parts: [{ text: data.response }] },
          ];
        });
        setBotResponseLoading(false);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = [...prevChatHistory];
        updatedChatHistory.pop();
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
