'use client';
import { useState } from 'react';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // To store conversation history
  const [botResponseLoading, setBotResponseLoading] = useState(false); // Track loading state for bot response

  // Function to send user message and history to the server
  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent empty messages

    // Append the user's message to the chat history immediately
    const newChatHistory = [
      ...chatHistory,
      { role: 'user', parts: [{ text: message }] },
      { role: 'model', parts: [{ text: 'loading...' }] }, // Add loading message for bot response
    ];

    setChatHistory(newChatHistory); // Update the chat history with user's message and loading state
    setBotResponseLoading(true); // Set loading state for bot response
    setMessage(''); // Clear input field immediately after sending

    try {
      const res = await fetch('/api/categories/grief', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: message,
          history: chatHistory, // Send the chat history along with the current message
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Replace the loading message with the actual bot response
        setChatHistory((prevChatHistory) => {
          // Remove the last "loading..." message
          const updatedChatHistory = [...prevChatHistory];
          updatedChatHistory.pop(); // Remove last message (loading...)
          // Add the actual bot response
          return [
            ...updatedChatHistory,
            { role: 'model', parts: [{ text: data.response }] },
          ];
        });
        setBotResponseLoading(false); // Turn off loading state
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // If there is an error, remove the "loading..." message and show an error message
      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = [...prevChatHistory];
        updatedChatHistory.pop(); // Remove the last "loading..." message
        return [
          ...updatedChatHistory,
          {
            role: 'model',
            parts: [{ text: 'Error: Unable to get response.' }],
          },
        ];
      });
      setBotResponseLoading(false); // Turn off loading state
    }
  };

  return (
    <div className="w-screen h-screen mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="chatbox mb-4 h-[90%] overflow-y-scroll no-scrollbar border border-gray-300 p-4">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`message mb-2 flex items-center ${
              chat.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* Show the bot icon for bot messages */}
            {chat.role === 'model' && (
              <img
                src="/bot.jpg" // Replace with the actual path of your bot icon
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

            {/* Show the user icon for user messages */}
            {chat.role === 'user' && (
              <img
                src="/avatar.jpeg" // Replace with the actual path of your user icon
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
          disabled={botResponseLoading} // Disable button while waiting for bot response
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
