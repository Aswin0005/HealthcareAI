// pages/api/analyzeText.js
import { NextResponse } from "next/server";
import axios from 'axios'

export async function POST(req, res) {
    try {
        const {text , threshold = 0.3 } = await req.json()
        const response = await axios.post('http://127.0.0.1:8000/analyze-text/', {
            text, threshold
        });

        // Forward the response from FastAPI
        console.log(response)
        return NextResponse.json(response.data , {status : 200});
    } catch (error) {
        console.error('Error forwarding request:', error.message);
        return NextResponse.json({ error: 'An error occurred while processing the request.' },{status : 500});
    }
}
