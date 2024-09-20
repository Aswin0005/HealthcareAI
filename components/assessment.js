"use client";

import { useState } from "react";
import axios from "axios";
import { questions } from "../data/questions"; // Adjust the path if necessary

function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOptionSelect = (option) => {
    const newResponses = [...responses, option];
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, submit responses
      submitResponses(newResponses);
    }
  };

  const submitResponses = async (responses) => {
    setLoading(true);
    console.log("Submitting responses:", { responses })
    try {
      const response = await axios.post("/api/assessment", { responses : responses });
      setResult(response.data);
      setShowResult(true);
    } catch (error) {
      console.error("Error submitting responses:", error);
      alert("There was an error processing your responses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showResult) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Assessment Result</h2>
          {result && (
            <>
              <p className="text-lg">
                You are mostly affected by:{" "}
                <span className="font-semibold text-blue-600">{result.category}</span>
              </p>
              {result.keywords && result.keywords.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold">Keywords from your responses:</p>
                  <ul className="list-disc list-inside text-left">
                    {result.keywords.map((word, index) => (
                      <li key={index}>{word}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setResponses([]);
              setShowResult(false);
              setResult(null);
            }}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Mental Health Assessment</h2>
        <div>
          <p className="text-lg mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <h3 className="text-xl mb-6">{questions[currentQuestion].question}</h3>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className="w-full text-left px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {loading && <p className="mt-4 text-center">Analyzing your responses...</p>}
      </div>
    </div>
  );
}

export default Assessment;
