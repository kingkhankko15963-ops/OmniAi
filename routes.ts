import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(message);
    res.json({ reply: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: "OmniAi Error" });
  }
});

app.listen(3000, () => console.log("OmniAi is live on port 3000"));
