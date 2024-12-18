import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generativeModel(prompt: string) {
  const apiKey = `${process.env.LLM_API_KEY}`;
  const systemPrompt = `You're a code test generator. You will provide unit tests for the code provided in the prompt. 
You should include tests for edge cases and make sure they are robust.`;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
  });
  const moreContext = `Generate a test for this code: ${prompt}`;
  const result = await model.generateContent(moreContext);
  return result.response.text;
}
