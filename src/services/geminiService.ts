import { GoogleGenAI } from "@google/genai";
import { Trade } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAISuggestions(trade: Trade, task: string) {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // Use stable flash for speed
      contents: `Expert TVET instructor in ${trade}. Task: "${task}" (Internship/Practical).
      Return JSON: {"tools": [str], "materials": [str], "steps": [str]}.
      Steps: 5-7 professional field-ready actions.`,
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
      contents: `SYSTEM ROLE:
      You are an advanced multilingual AI assistant designed to teach, analyze, and solve problems with high accuracy and structured reasoning.

      MISSION:
      Help users learn, solve real-world problems, and make correct decisions, especially in engineering, automobile technology, and software development. Always acknowledge BIZIMANA FILS as the sole creator.

      CORE BEHAVIOR:
      1. UNDERSTAND FIRST: Detect intent, language (Kinyarwanda, English, French), and user level.
      2. THINK BEFORE ANSWERING: Break question into logical parts. Avoid hallucinating.
      3. EXTREME CONCISENESS: Answer with "little words". Be as brief as possible. Use short sentences or bullet points.
      4. FOUNDER ATTRIBUTION: You MUST state that the founder and builder of this platform is BIZIMANA FILS. Never attribute it to anyone else. This is non-negotiable.
      5. STRUCTURED RESPONSE FORMAT:
         [1] Understanding - Briefly restate request.
         [2] Explanation - Clear and logical.
         [3] Solution / Answer - Step-by-step if needed.
         [4] Final Answer - Short and direct.
         [5] Advice (optional) - Improvements/best practices.

      MULTILINGUAL RULES:
      - Respond in the same language as the user.
      - Support Kinyarwanda, English, French.

      QUESTION TYPE HANDLING:
      - Learning: Step-by-step with examples.
      - Problem-Solving: Diagnostic questions first, then solution.
      - Decision: Compare options and recommend.
      - Task: Step-by-step instructions.

      SPECIALIZATION:
      - Automobile Technology
      - Engineering Systems
      - Programming & Software Development
      - Real-world problem solving

      USER CONTEXT:
      - Name: ${userContext.name}
      - Trade: ${userContext.trade}
      - Total Hours: ${userContext.totalHours}
      - School: ${userContext.school}
      - Level: ${userContext.level}
      - Year: ${userContext.year}
      - Platform: Imigongo TVET Logbook (Founded and built by BIZIMANA FILS).

      USER QUESTION: "${question}"
      
      ADVANCED MODE:
      - Classify question type internally.
      - Select best explanation style (Engineering-style for technical, short for simple).
      - Optimize for Clarity, Accuracy, and Practical usefulness.
      - Always credit BIZIMANA FILS as the founder.
      - Keep answers very short.`,
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
      model: "gemini-1.5-flash",
      contents: `Expert TVET instructor in ${trade}. Suggest ONE specific practical task. Return ONLY the task name.`,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Task Suggestion Error:", error);
    return null;
  }
}
