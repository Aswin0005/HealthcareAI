'use client';
import React, { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from 'date-fns';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const moodColors = {
  happy: 'bg-green-400',
  sad: 'bg-red-400',
  angry: 'bg-orange-400',
  anxious: 'bg-yellow-300',
  neutral: 'bg-gray-300',
};

const moodEmojis = {
  'Very Negative / Sad': '😭',
  'Negative / Upset': '😞',
  'Neutral / Indifferent': '😐',
  'Positive / Happy': '😊',
  'Very Positive / Joyful': '🥳',
};

const fetchMoodPrediction = async (chatHistory) => {
  try {
    const userResponses = chatHistory
      .map((entry) => entry.userMessage)
      .filter((message) => message)
      .join('\n'); // Join the messages with a newline character

    const response = await fetch('/api/mood-prediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: userResponses }),
    });

    const result = await response.json();
    console.log(result.mood);
    return result.mood || 'neutral'; // Default to 'neutral' if no mood is found
  } catch (error) {
    console.error('Error predicting mood:', error);
    return 'neutral'; // Default to 'neutral' on error
  }
};

export default function Component() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const fetchChatHistoryForDate = async (userId, date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const chatHistoryDocRef = doc(
      db,
      'users',
      userId,
      'chatHistory',
      dateString
    );
    const chatHistoryDoc = await getDoc(chatHistoryDocRef);
    return chatHistoryDoc.exists() ? chatHistoryDoc.data() : null;
  };

  const storeMoodForDate = async (userId, date, mood) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const chatHistoryDocRef = doc(
      db,
      'users',
      userId,
      'chatHistory',
      dateString
    );
    await setDoc(chatHistoryDocRef, { mood }, { merge: true });
  };

  const addEntry = (date, mood, chatHistory) => {
    setEntries((prevEntries) => [
      ...prevEntries.filter(
        (entry) => entry.date.toDateString() !== date.toDateString()
      ),
      { date, mood, chatHistory },
    ]);
  };

  const getEntryForDate = (date) => {
    return entries.find(
      (entry) => entry.date.toDateString() === date.toDateString()
    );
  };

  const analyzeMoodForMonth = async (userId) => {
    setLoading(true);
    const updatedEntries = [];

    for (const day of monthDays) {
      const entry = await fetchChatHistoryForDate(userId, day);
      if (entry && entry.chatHistory) {
        const mood = await fetchMoodPrediction(entry.chatHistory);
        await storeMoodForDate(userId, day, mood); // Store mood in Firestore
        updatedEntries.push({
          date: day,
          mood,
          chatHistory: entry.chatHistory,
        });
        console.log(updatedEntries);
      }
    }

    // Once all entries are updated, set them in the state
    setEntries((prevEntries) => [
      ...prevEntries.filter(
        (prevEntry) =>
          !updatedEntries.some(
            (newEntry) =>
              newEntry.date.toDateString() === prevEntry.date.toDateString()
          )
      ),
      ...updatedEntries,
    ]);

    setLoading(false);
  };

  useEffect(() => {
    const userId = 'user123'; // Replace with actual user ID
    analyzeMoodForMonth(userId);
  }, [currentDate]);

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-100 to-indigo-100">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
        <CardTitle className="text-3xl font-bold text-center">
          Mental Health Journal
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1
                )
              )
            }
            variant="outline"
            className="text-purple-600 hover:bg-purple-100"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <h2 className="text-2xl font-semibold text-purple-800">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <Button
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
                )
              )
            }
            variant="outline"
            className="text-purple-600 hover:bg-purple-100"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-purple-700"
            >
              {day}
            </div>
          ))}
          {monthDays.map((day) => {
            const entry = getEntryForDate(day);
            return (
              <Button
                key={day.toISOString()}
                variant="outline"
                className={`h-16 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 
                  ${isSameMonth(day, currentDate) ? '' : 'opacity-50'} 
                  ${entry ? moodColors[entry.mood] : 'bg-white'}
                  ${
                    selectedDate &&
                    day.toDateString() === selectedDate.toDateString()
                      ? 'ring-2 ring-purple-500'
                      : ''
                  }`}
                onClick={() => setSelectedDate(day)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold">
                    {format(day, 'd')}
                  </span>
                  {entry && (
                    <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                  )}
                </div>
              </Button>
            );
          })}
        </div>
        {selectedDate && (
          <Card className="mt-6 bg-white shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-200 to-indigo-200">
              <CardTitle className="text-xl text-purple-800">
                {format(selectedDate, 'MMMM d, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {getEntryForDate(selectedDate) ? (
                <div>
                  <p className="text-lg mb-2">
                    <strong>Mood:</strong> {getEntryForDate(selectedDate)?.mood}{' '}
                    {moodEmojis[getEntryForDate(selectedDate)?.mood || '']}
                  </p>
                  <p className="text-lg mb-2">
                    <strong>Chat History:</strong>
                  </p>
                  <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded-lg text-gray-800">
                    {getEntryForDate(selectedDate)?.chatHistory}
                  </p>
                </div>
              ) : (
                <p className="text-gray-600 italic">No entry for this date.</p>
              )}
            </CardContent>
          </Card>
        )}
        <Button
          className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600"
          onClick={() => analyzeMoodForMonth('user123')}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </Button>
      </CardContent>
    </Card>
  );
}
