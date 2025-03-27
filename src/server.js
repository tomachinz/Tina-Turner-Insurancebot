import { hostname } from "node:os";
// import express from "express";
import api from "./api.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.REACT_APP_SERVER_PORT || 4000
const apiKey = process.env.GOOGLE_API_KEY;// Initialize Google Gemini AI with API key from .env file
 

// Start server
api.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
