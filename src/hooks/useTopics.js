import { useState, useEffect } from "react";

export default function useTopics() {
    const [topics, setTopics] = useState(() => {
        const saved = localStorage.getItem("myTopics");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("myTopics", JSON.stringify(topics));
    }, [topics]);

    const addTopic = (newTopic) => {
        const topic = {
            ...newTopic,
            id: crypto.randomUUID(), 
        };
        setTopics([...topics, topic]);
    };

    const deleteTopic = (id) => {
        setTopics(topics.filter((t) => t.id !== id));
    };

    const updateTopic = (updatedTopic) => {
        setTopics(topics.map((t) => (t.id === updatedTopic.id ? updatedTopic : t)));
    };

    const getTopicsBySubject = (subjectId) => {
        return topics.filter((t) => t.subjectId === subjectId);
    };

    return { 
        topics, 
        addTopic, 
        deleteTopic, 
        updateTopic, 
        getTopicsBySubject 
    };
}