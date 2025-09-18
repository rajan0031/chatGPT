import { GoogleGenAI } from "@google/genai";
import promptSync from "prompt-sync";
const prompt = promptSync();



const ai = new GoogleGenAI({ apiKey: "AIzaSyDY1HOBzIU-TBsh_uHv9IwoxzvDmTRxuho" });

const history = [];


async function chat(query) {

    history.push({
        role: "user",
        parts: [{ text: query }]
    })

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: history,
    });
    console.log(response.text)
    console.log(history)
    history.push({
        role: "model",
        parts: [{ text: response.text }]
    })

}

async function name() {
    const query = prompt("Enter your query: ");
    await chat(query)
    name()
}

name();