import { GoogleGenAI } from "@google/genai";

// ✅ Latest Google GenAI package
const ai = new GoogleGenAI({ 
  apiKey: "AIzaSyDMQnkJpbfN4czL6L7lEgVg9r_ig0vVkgQ" 
});

export async function getGeminiResponse(userInput) {
  try {
    console.log("🚀 Detailed Gemini API call...", userInput);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert startup consultant. Create COMPREHENSIVE and DETAILED business pitches.

Generate these 5 components with ELABORATE descriptions:

STARTUP_NAME: [Innovative and brandable business name]
TAGLINE: [Memorable and compelling tagline] 
PITCH: [Detailed 3-4 sentence explanation of the business model, value proposition, and unique features]
AUDIENCE: [Comprehensive breakdown of target market segments, user demographics, and customer profiles]
LANDING: [Complete website hero section with engaging headline, subheadline, and strong call-to-action]

User's business idea: "${userInput}"

Provide THOROUGH, DETAILED, and PROFESSIONAL responses for each section. Do not be brief - give comprehensive insights.`
    });

    const generatedText = response.text;
    console.log("✅ Detailed Gemini response:", generatedText);
    return generatedText;

  } catch (error) {
    console.error("❌ Gemini API error:", error);
    return "ERROR: Could not generate detailed pitch.";
  }
}