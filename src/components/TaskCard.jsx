import React, { useState } from "react";
import "./components.css"
export default function TaskCard({ id, title, subject, topic, deadline, priority, isCompleted, onDelete, onUpdate }) {
    const [isEditing, setEditing] = useState(false);
    const [curTask, setCurTask] = useState({ id, title, subject, topic, deadline, priority, isCompleted });
    const getStatus = () => {
        if (isCompleted) return "Completed";
        const today = new Date().setHours(0, 0, 0, 0);
        const deadlineDate = new Date(deadline).setHours(0, 0, 0, 0);
        if (deadlineDate < today) return "Missed";
        return "Pending";
    }
    const status = getStatus();
    const toggleEdit = () => {
        if (!isEditing) {
            setCurTask({ id, title, subject, topic, deadline, priority, isCompleted });
        }
        setEditing(!isEditing);
    }
    const handleSave = () => {
        onUpdate(curTask);
        setEditing(false);

    }
    if (isEditing) {
        return (
            <div className="cont editing">
                <input value={curTask.title} onChange={(e) => setCurTask({ ...curTask, title: e.target.value })} />
                <input type="date" value={curTask.deadline} onChange={(e) => setCurTask({ ...curTask, deadline: e.target.value })} />
                <select value={curTask.priority} onChange={(e) => setCurTask({ ...curTask, priority: e.target.value })}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button onClick={handleSave}>Save</button>
                <button onClick={toggleEdit}>Cancel</button>
            </div>
        )
    }
    return (<div className={`cont ${status.toLowerCase()}`}>
        <div className="title">{title}</div>
        <div className="subject">{subject}</div>
        <div className="topic">{topic}</div>
        <div className="deadline">{deadline}</div>
        <div className="priority">{priority}</div>
        <div className="status">{status}</div>
        <button onClick={() => onUpdate({ id, title, subject, topic, deadline, priority, isCompleted: !isCompleted })}>
            {isCompleted ? "Undo" : "Complete"}
        </button>
        <button onClick={toggleEdit}>Edit</button>
        <button onClick = {onDelete}>Delete</button>
    </div>);
}
