import express from "express";
import { GoogleGenAI } from "@google/genai";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // for CSS

app.set("view engine", "ejs");

const ai = new GoogleGenAI({ apiKey: "AIzaSyDY1HOBzIU-TBsh_uHv9IwoxzvDmTRxuho" });

// Frontend
app.get("/", (req, res) => {
  res.render("index");
});

// API for chat
app.post("/chat", async (req, res) => {
  const { query, history } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    res.json({ reply: response.text });
  } catch (error) {
    res.status(500).json({ reply: "⚠️ Error: " + error.message });
  }
});

app.listen(4000, () => {
  console.log("🌐 Web server running at http://localhost:4000");
});
