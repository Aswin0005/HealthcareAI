import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  if (req.method === "POST") {
    try {
      console.log('Hii')
      const { responses } = await req.json();
      console.log('Res',responses)
      // Forward the request to the FastAPI server
      const apiResponse = await axios.post("http://127.0.0.1:8000/classify", {
        responses,
      });

      return NextResponse.json(apiResponse.data , {status : 200});
    } catch (error) {
      console.error("Error communicating with AI model:", error.message);
      return NextResponse.json({ error: "Internal Server Error" } , {status : 500});
    }
  } else {
    // res.setHeader("Allow", ["POST"]);
    return NextResponse.json(`Method ${req.method} Not Allowed` ,{status : 405});
  }
}
