// components/TextAnalyzer.js
"use client";
import { useState } from 'react';
import {db} from "../../firebase"
import { addDoc, collection } from 'firebase/firestore';

export default function TextAnalyzer({ onSubmit }) {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeText = async (text) => {
        console.log(text)
        const response = await fetch('/api/analyzeText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        return await response.json();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const analysisResult = await analyzeText(text);
        console.log(analysisResult);
        setResult(analysisResult);
        setLoading(false);

        // Check if the text is safe before proceeding
        if (analysisResult.safe) {
            // onSubmit(text);  // Proceed with the submission
            await addDoc(collection(db, 'posts'), {
                content: text,
                createdAt: new Date(),
                user: "User123"
            });
            setText('');     // Clear input
            setResult(null); // Reset results
        } else {
            // Alert the user that their post is unsafe
            alert('Your post contains potentially harmful content. Please revise it.');
            setText(''); // Clear input for them to revise
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <textarea
                className="w-full h-32 p-2 border rounded"
                placeholder="Enter your post..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                className="mt-2 bg-blue-500 text-white p-2 rounded"
                type="submit"
                disabled={loading}
            >
                Submit Post
            </button>
            {loading && <p>Loading...</p>}
            {result && (
                <div className={`mt-4 ${result.safe ? 'text-green-500' : 'text-red-500'}`}>
                    <p>Status: {result.safe ? 'Safe' : 'Unsafe'}</p>
                    <div>
                        {Object.entries(result.toxicity_scores).map(([label, score]) => (
                            <p key={label}>{label}: {score.toFixed(2)}</p>
                        ))}
                    </div>
                </div>
            )}
        </form>
    );
}
