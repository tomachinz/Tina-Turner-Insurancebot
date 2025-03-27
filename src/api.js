import { hostname } from "node:os";
// import { __dirname } from "node:fs";
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
// import generatePrompt from "./generatePrompt.js";
import insurancebotPrompt from "./insurancebotPrompt.js";
import startSession from "./startSession.js";
import saveChatHistory from "./saveChatHistory.js";

const __dirname = import.meta.dirname;
let sessionID = -1;

dotenv.config();

const api = express();
const apiKey = process.env.GOOGLE_API_KEY;// Initialize Google Gemini AI with API key from .env file
const port = process.env.REACT_APP_SERVER_PORT || 4000
const generationConfig = { // AI model configuration
  temperature: 0.3, // Controls response randomness (0.0-1.0)
  maxOutputTokens: 1024, // Maximum length of generated responses
};

api.use(cors()); // security model
api.use(express.json());

/**
 * Main insurancebot endpoint - handles conversation flow and AI responses
 * Processes user input and return insurancebot responses
 */
api.post("/api/insurance", async (req, res) => {
  const { carMakeModel, messageHistory } = req.body;

  if (process.env.DEBUG === true) { 
    console.log(
      "Received messageHistory:",
      JSON.stringify(messageHistory, null, 2)
    );
  }
 

  try {
    // Validate message history format
    const lastMessageText =
      messageHistory?.[messageHistory.length - 1]?.parts?.[0]?.text;

    if (!messageHistory?.length || !lastMessageText) {
      return res.status(400).json({ error: "Invalid message history format" });
    }

    // Generate AI prompt based on context 
    const prompt = insurancebotPrompt(carMakeModel, lastMessageText, messageHistory);

    console.log("Insurancebot Prompt:", prompt);

    try {
      // Call Gemini AI API for response generation
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     
      console.log(`sessionID: ${sessionID}`);
      saveChatHistory(response.data, sessionID);


      // Debug logging for AI response
      console.log("Gemini Result:", JSON.stringify(response.data, null, 2));

      // Validate and extract AI response
      const aiResponse =  response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiResponse) {
        res.json({ reply: aiResponse });
      } else {
        console.error("Unexpected Gemini API response:", response.data);
        return res
          .status(500)
          .json({ error: "Unexpected Gemini API response format" });
      }
    } catch (apiError) {
      // Handle Gemini API specific errors
      console.error(
        "Gemini API DERKA Error:",
        apiError.response ? apiError.response.data : apiError.message
      );
      return res.status(500).json({
        error: "Gemini API request failed",
        details: apiError.response ? apiError.response.data : apiError.message,
      });
    }
  } catch (error) {
    // Handle general server errors
    console.error("Error generating response:", error);
    res
      .status(500)
      .json({ error: "Failed to generate response", details: error.message });
  }
});











api.post("/api/start-session", async (req, res) => {
  const  carMakeModel  = JSON.stringify( req.body.carMakeModel );
  sessionID =  startSession(carMakeModel);
  console.log(`API is sending in response  carMakeModel: ${ carMakeModel} sessionID: ${sessionID}`);

  res.status(200).json({sessionID: sessionID});
});
api.post("/api/save-session", async (req, res) => {
  const { carMakeModel, messageHistory, sessionID } = req.body;
  saveChatHistory(carMakeModel, messageHistory, sessionID);
  res.status(200).send(messageHistory);
});

export default api;
