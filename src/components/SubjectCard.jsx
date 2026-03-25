import React, {useState} from "react";
import "./components.css"
export default function SubjectCard({ id, subject, description, color, onDelete, updateSubject, onOpen}) {
    const style1 = { 
        display: "flex", 
        flexDirection: "column", 
        height: 150, 
        width: 250, 
        borderRadius: 8, 
        padding: 10
    };
    const [isEditing, setEditing] = useState(false);
    const [curProps, setCurProps] = useState({id, subject, description, color});
    const handleSave = () => {
        updateSubject(curProps);
        setEditing(false);
    }
    const toggleEdit = () => {
        if (!isEditing) {
            setCurProps({id, subject, description, color});
        }
        setEditing(!isEditing);
    }
    if (isEditing) {
        return (<div className = "editingForm">
            <label> New Subject Name:
                <input type = "text" value = {curProps.subject} onChange = {(e) => setCurProps({...curProps, subject: e.target.value})}/>
            </label>
            <label> New Description:
                <input type = "text" value = {curProps.description} onChange = {(e) => setCurProps({...curProps, description: e.target.value})}/>
            </label>
            <label> New Color:
                <input type = "color" value = {curProps.color} onChange = {(e) => setCurProps({...curProps, color: e.target.value})}/>
            </label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={handleSave}>Save</button>
                <button onClick={toggleEdit}>Cancel</button>
            </div>
        </div>)
    }
    return (
        <div className="container" style={style1}>
            <button onClick = {onDelete}>Delete</button>
            <div className="color" style={{ backgroundColor: color || "gray", height: '10px', width: '100%'}}></div>
            <div className="subject"><strong>{subject || "Subject Name"}</strong></div>
            <div className="description">{description || "Description"}</div>
            <button onClick = {toggleEdit}>Edit</button>
            <button onClick={onOpen}>Open</button>
        </div>
    );
}