import { GoogleGenerativeAI } from "@google/generative-ai";
import { detectTestingLibrary } from "./detectLibrary";
import * as vscode from "vscode"

export async function generativeModel(code: string, context: vscode.ExtensionContext) {
  const apiKey = `${process.env.LLM_API_KEY}`;
  const systemPrompt = `You're a code test generator. You will provide unit tests for the code provided in the prompt. 
You should include tests for edge cases and make sure they are robust. The response should be in a plain text format and not in markdown.`;

let prompt = `Generate a test for this code: \n\n${code}`;

  const testingLibrary = await detectTestingLibrary(context);

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
  });
  if(testingLibrary){
    prompt += `\n\nUse the ${testingLibrary} testing library for writing the tests.`;
  }else {
    prompt += `\n\nUse a default testing library like Jest for writing the tests.`;
  }
  
  const result = await model.generateContent(prompt);
  return result.response.text;
}
