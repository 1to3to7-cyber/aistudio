import { GoogleGenAI } from "@google/genai";
import { Trade } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAISuggestions(trade: Trade, task: string) {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert TVET instructor in ${trade}. 
      A student is logging a task: "${task}".
      Provide a comprehensive list of:
      1. Tools needed
      2. Materials/Equipment required
      3. 5-7 clear, professional steps to complete this task.
      
      Format the response as JSON with:
      "tools": (array of strings),
      "materials": (array of strings),
      "steps": (array of strings).`,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}

export async function askPlatformAssistant(question: string, userContext: any) {
  if (!process.env.GEMINI_API_KEY) {
    return "I'm sorry, I can't connect to my brain right now. Please check your internet or API key.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the "Imigongo AI Assistant", a friendly Rwandan guide for the Imigongo TVET Logbook platform.
      
      CORE MISSION:
      - Ensure 100% accuracy in explaining platform features.
      - Learn from the user's current state to provide personalized advice.
      - Act as a mentor for TVET students, encouraging professional documentation.

      USER CONTEXT:
      - Name: ${userContext.name}
      - Trade: ${userContext.trade}
      - Total Hours: ${userContext.totalHours}
      - Current Language: ${userContext.language || 'English'}

      PLATFORM FEATURES & HOW THEY WORK:
      1. Logbook: Students record daily tasks. "Magic Fill" uses AI to suggest tools/steps.
      2. Progress: Visualizes hours and badges. Badges are earned at 10h (Beginner), 50h (Intermediate), 100h (Advanced), 250h (Expert), 500h (Master).
      3. Profile: Users can change their Trade, UI Theme, and Language.
      4. Export: Generates a professional PDF for instructors.
      5. Timer: A session timer on the Home screen to track real-time work.

      USER QUESTION: "${question}"
      
      INSTRUCTIONS:
      - If the question is about a specific feature, explain EXACTLY how to find and use it.
      - If the user is struggling with their trade, provide encouraging industry-standard advice.
      - Use Kinyarwanda greetings (Muraho, Amakuru).
      - If you don't know something about the platform, admit it and suggest they check the "About" section.
      - Keep responses concise, professional, and culturally respectful.`,
    });

    return response.text;
  } catch (error) {
    console.error("Assistant Error:", error);
    return "I encountered an error while trying to help. Please try again later.";
  }
}

export async function suggestTask(trade: Trade) {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert TVET instructor in ${trade}. 
      Suggest ONE specific, practical task a student might perform today.
      Return ONLY the task name as a string.`,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Task Suggestion Error:", error);
    return null;
  }
}
