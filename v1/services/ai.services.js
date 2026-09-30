import { Groq } from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export async function generarRespuesta(prompt) {

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "openai/gpt-oss-120b",
            temperature: 1,
            max_completion_tokens: 2048,
            top_p: 1,
            stream: false,
            reasoning_effort: "medium",
            timeout: 10000
        });

        const contenido = chatCompletion?.choices?.[0]?.message?.content;

        if (typeof contenido !== "string" || contenido.length === 0) {
            return null;
        }

        return contenido;

    } catch (error) {
        console.error("Error al comunicarse con Groq:", error);
        return null;
    }
}