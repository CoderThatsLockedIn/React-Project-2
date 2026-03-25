import React, { useState } from "react";
import SubjectCard from "./SubjectCard";
import "./components.css"
export default function SubjectForm({addSubject}) {
    const [formData, setFormData] = useState({ subject: '', description: '', color: ''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.subject) return alert("Title is required");
        addSubject(formData);
        setFormData({ subject: '', description: '', color: '' });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label> Subject Name:
                    <input name="subject" type="text" onChange={handleChange} value={formData.subject}></input>
                </label>
                <label> Description:
                    <input name="description" type="text" onChange={handleChange} value={formData.description}></input>
                </label>
                <label> Color:
                    <input name="color" type="color" onChange={handleChange} value={formData.color}></input>
                </label>
                <input type="submit" value="Submit Form Data"></input>
            </form>
            
        </div>
    )

}