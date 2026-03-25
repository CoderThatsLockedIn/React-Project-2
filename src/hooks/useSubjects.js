import {useState, useEffect} from "react";
export default function useSubjects() {
    const [subjects, setSubjects] = useState(() => {
        const saved = localStorage.getItem("mySubjects");
        return saved ? JSON.parse(saved) : [];
    })
    useEffect(() => {
        localStorage.setItem("mySubjects", JSON.stringify(subjects));
    }, [subjects])
    const addSubject = (newSubj) => setSubjects([...subjects, {...newSubj, id: crypto.randomUUID()}]);
    const deleteSubject = (id) => {
        const subjectToDelete = subjects.find(s => s.id === id);
        if (!subjectToDelete) return;
        const updatedSubjects = subjects.filter((s) => s.id !== id);
        setSubjects(updatedSubjects);
        localStorage.setItem("mySubjects", JSON.stringify(updatedSubjects));
        const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const remainingTasks = allTasks.filter(task => task.subject !== subjectToDelete.subject);
        localStorage.setItem("tasks", JSON.stringify(remainingTasks));
    }
    const updateSubject = (updated) => setSubjects(subjects.map((s) => updated.id === s.id ? updated : s));
    return {subjects, addSubject, deleteSubject, updateSubject};

}