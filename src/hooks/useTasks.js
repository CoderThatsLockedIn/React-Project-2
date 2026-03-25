import {useState, useEffect} from "react";
export default function useTasks() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("myTasks");
        return saved ? JSON.parse(saved) : [];
    })
    useEffect(() => {
        localStorage.setItem("myTasks", JSON.stringify(tasks));
    }, [tasks])
    const addTask = (newTask) => setTasks([...tasks, {...newTask, id: crypto.randomUUID(), isCompleted: false}]);
    const deleteTask = (id) => setTasks(tasks.filter(s => s.id !== id));
    const updateTask = (updated) => setTasks(tasks.map((s) => updated.id === s.id ? updated : s));
    return {tasks, addTask, deleteTask, updateTask};
}