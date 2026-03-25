import React, {useState} from "react";
import TaskCard from "./TaskCard";
import "./components.css"
export default function TaskForm({subjectList, addTask}) {
    const [formData, setFormData] = useState({title:'', subject:'', topic:'', deadline:'', priority:'Medium'});
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.subject) return alert("Please fill in title and/or subject");
        addTask(formData);
        setFormData({title: '', subject: "", topic: "", deadline: "", priority: "medium" });
    }
    return (<form onSubmit = {handleSubmit}>
        <h3>Add New Task</h3>
        <label> Title:
            <input required value = {formData.title} onChange = {(e) => setFormData({...formData, title: e.target.value})} name = "title" type = "text"></input>
        </label>
        <label> Subject:
            <select required value = {formData.subject} onChange = {(e) => setFormData({...formData, subject: e.target.value})} name = "subject">
                <option value="">-- Select Subject --</option>.
                {subjectList.map(s => (
                    <option key = {s.id} value = {s.subject}>{s.subject}</option>
                ))}                
            </select>
        </label>
        <label> Topic:
            <input value = {formData.topic} onChange = {(e) => setFormData({...formData, topic: e.target.value})} name = "topic"></input>
        </label>
        <label> Deadline: 
            <input value = {formData.deadline} onChange = {(e) => setFormData({...formData, deadline: e.target.value})} name = "deadline" type = "date"></input>
        </label>
        <label> Priority: 
            <select value = {formData.priority} name = "priority" onChange = {(e) => setFormData({...formData, priority: e.target.value})}>
                <option value = "Low">Low</option>
                <option value = "Medium">Medium</option>
                <option value = "High">High</option>
            </select>
        </label>
        <button type = "submit">Add Task</button>
    </form>)
}