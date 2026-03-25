import React, { useState } from "react";
import "./components.css"
export default function TopicList({ subject, topics, onBack, addTopic, deleteTopic, updateTopic }) {
    const [formData, setFormData] = useState({ name: "", difficulty: "Medium", status: "Pending", notes: "" });
    
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name) return alert("Topic name is required");
        addTopic({ ...formData, subjectId: subject.id });
        setFormData({ name: "", difficulty: "Medium", status: "Pending", notes: "" });
    };

    const startEdit = (topic) => {
        setEditingId(topic.id);
        setEditData({ ...topic });
    };

    const handleSaveUpdate = () => {
        updateTopic(editData);
        setEditingId(null);
    };

    return (
        <div className="topic-view">
            <button onClick={onBack}>← Back to Subjects</button>
            <h2>Topics for {subject.subject}</h2>

            <form onSubmit={handleSubmit} className="topic-form">
                <input 
                    placeholder="Topic Name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
                <select value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <button type="submit">Add Topic</button>
            </form>

            <hr />

            <div className="topic-list">
                {topics.map((t) => (
                    <div key={t.id} className="topic-card" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                        {editingId === t.id ? (
                            <>
                                <input 
                                    value={editData.name} 
                                    onChange={(e) => setEditData({...editData, name: e.target.value})} 
                                />
                                <select 
                                    value={editData.status} 
                                    onChange={(e) => setEditData({...editData, status: e.target.value})}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Mastered">Mastered</option>
                                </select>
                                <textarea 
                                    value={editData.notes} 
                                    onChange={(e) => setEditData({...editData, notes: e.target.value})} 
                                />
                                <button onClick={handleSaveUpdate}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </>
                        ) : (
                            // VIEW MODE UI
                            <>
                                <h4>{t.name}</h4>
                                <p>Difficulty: {t.difficulty} | Status: {t.status}</p>
                                <p>{t.notes || "No notes provided"}</p>
                                <button onClick={() => startEdit(t)}>Edit</button>
                                <button onClick={() => deleteTopic(t.id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}