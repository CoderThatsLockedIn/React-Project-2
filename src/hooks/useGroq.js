import { useState } from "react";

export default function useGroq() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    const askAI = async (userPrompt) => {
        setLoading(true);
        try {
            const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`, // Replace with your key
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        { role: "system", content: "You are a helpful study assistant. Break down complex topics into simple terms." },
                        { role: "user", content: userPrompt }
                    ],
                }),
            });

            const data = await res.json();
            const content = data.choices[0].message.content;
            setResponse(content);
            return content;
        } catch (error) {
            console.error("Groq API Error:", error);
            setResponse("Sorry, I ran into an error connecting to Groq.");
        } finally {
            setLoading(false);
        }
    };

    return { askAI, response, loading };
}