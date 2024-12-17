"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generativeModel = generativeModel;
const generative_ai_1 = require("@google/generative-ai");
function generativeModel(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = `AIzaSyAC5YPRbStwGBl5TdT_bb9II3QQVJRByVw`;
        const systemPrompt = `You're a code test generator. You will provide unit tests for the code provided in the prompt. 
You should include tests for edge cases and make sure they are robust.`;
        const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: systemPrompt,
        });
        const moreContext = `Generate a test for this code: ${prompt}`;
        const result = yield model.generateContent(moreContext);
        return result.response.text;
    });
}
