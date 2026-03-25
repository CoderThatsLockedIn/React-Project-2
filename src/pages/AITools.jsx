import React, { useState } from "react";
import useGroq from "../hooks/useGroq";
import useTopics from "../hooks/useTopics";
import "./pages.css"
export default function AITools() {
    const { askAI, response, loading } = useGroq();
    const { topics } = useTopics();
    const [input, setInput] = useState("");

    const handleExplainTopic = (topicName) => {
        const prompt = `Explain the study topic "${topicName}" in 3 simple bullet points for a student.`;
        askAI(prompt);
    };

    return (
        <div className="ai-container" style={{ padding: '20px' }}>
            <h2>🤖 AI Study Assistant</h2>
            
            <div className="chat-box">
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything (e.g., 'Explain Photosynthesis' or 'Give me a quiz on Algebra')"
                    style={{ width: '100%', height: '100px' }}
                />
                <button onClick={() => askAI(input)} disabled={loading}>
                    {loading ? "Thinking..." : "Ask AI"}
                </button>
            </div>

            {response && (
                <div className="ai-response" style={{ background: '#f4f4f4', padding: '15px', marginTop: '20px', borderRadius: '8px' }}>
                    <h3>AI Suggestion:</h3>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{response}</p>
                </div>
            )}

            <hr />

            <h3>Quick Help for Your Topics</h3>
            <p>Select a topic you're struggling with to get an AI summary:</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {topics.map(t => (
                    <button key={t.id} onClick={() => handleExplainTopic(t.name)}>
                        Explain {t.name}
                    </button>
                ))}
            </div>
        </div>
    );
}