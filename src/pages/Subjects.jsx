import React, { useState } from "react";
import useSubjects from "../hooks/useSubjects";
import SubjectForm from "../components/SubjectForm"
import SubjectCard from "../components/SubjectCard"
import useTopics from "../hooks/useTopics";
import TopicList from "../components/TopicList";
export default function Subjects() {
    const { subjects, addSubject, deleteSubject, updateSubject } = useSubjects();
    const [isFormOpen, setFormOpen] = useState(false);
    const { addTopic, deleteTopic, updateTopic: editTopic, getTopicsBySubject } = useTopics();
    
    // This state tracks which subject is currently "Open"
    const [activeSubject, setActiveSubject] = useState(null); 

    if (activeSubject) {
        return (
            <TopicList 
                subject={activeSubject} 
                topics={getTopicsBySubject(activeSubject.id)}
                onBack={() => setActiveSubject(null)}
                addTopic={addTopic}
                deleteTopic={deleteTopic}
                updateTopic={editTopic}
            />
        );
    }
    return (<div className="cont">
        <button onClick={() => setFormOpen(!isFormOpen)}>{isFormOpen ? "Close" : "+ Add Subject"}</button>
        {isFormOpen && <SubjectForm addSubject={(newSubj) => {
            addSubject(newSubj);
            setFormOpen(false);
        }} />}
        <div className = "subjCont">
            {(subjects.length > 0) ? (subjects.map((s) => (<SubjectCard 
            key = {s.id} {...s} 
            onDelete = {() => {deleteSubject(s.id)}}
            updateSubject = {updateSubject}
            onOpen = {() => setActiveSubject(s)} 
            />)          
            )) : (<p>No subjects yet. Create one to get started.</p>)}
        </div>
    </div>)
}