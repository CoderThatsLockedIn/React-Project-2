import React, { useState } from "react";
import { useData } from "../context/DataContext";
import TaskForm from "../components/TaskForm.jsx";
import TaskCard from "../components/TaskCard.jsx";

export default function Tasks() {
    // Accessing everything from Context
    const { tasks, subjects, deleteTask, updateTask, addTask } = useData();

    // UI State
    const [activeTab, setActiveTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isFormOpen, setFormOpen] = useState(false);

    // Filter & Sort State
    const [filterSubject, setFilterSubject] = useState("All");
    const [filterPriority, setFilterPriority] = useState("All");
    const [sortBy, setSortBy] = useState("deadline");

    // --- LOGIC: FILTERING & SEARCHING (Runs on every render) ---
    const filteredTasks = tasks.filter(task => {
        // 1. Search (Title, Subject, or Topic)
        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.topic && task.topic.toLowerCase().includes(searchQuery.toLowerCase()));

        // 2. Tab Logic
        const today = new Date().toISOString().split('T')[0];
        let matchesTab = true;
        if (activeTab === "Pending") matchesTab = !task.isCompleted;
        if (activeTab === "Completed") matchesTab = task.isCompleted;
        if (activeTab === "Overdue") matchesTab = !task.isCompleted && task.deadline < today;
        if (activeTab === "Revision") matchesTab = task.title.toLowerCase().includes("revise");

        // 3. Dropdown Filters
        const matchesSubject = filterSubject === "All" || task.subject === filterSubject;
        const matchesPriority = filterPriority === "All" || task.priority === filterPriority;

        return matchesSearch && matchesTab && matchesSubject && matchesPriority;
    }).sort((a, b) => {
        // 4. Sorting Logic
        if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
        if (sortBy === "priority") {
            const weight = { High: 1, Medium: 2, Low: 3 };
            return weight[a.priority] - weight[b.priority];
        }
        if (sortBy === "subject") return a.subject.localeCompare(b.subject);
        return 0;
    });

    return (
        <div className="tasks-page">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search tasks, topics, or subjects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="tabs">
                {["All", "Pending", "Completed", "Overdue", "Revision"].map(tab => (
                    <button
                        key={tab}
                        className={activeTab === tab ? "active-tab" : ""}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="toolbar">
                <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                    <option value="All">All Subjects</option>
                    {subjects.map(s => <option key={s.id} value={s.subject}>{s.subject}</option>)}
                </select>

                <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="deadline">Due Date</option>
                    <option value="priority">Priority</option>
                    <option value="subject">Subject Name</option>
                </select>

                <button onClick={() => setFormOpen(!isFormOpen)}>
                    {isFormOpen ? "Cancel" : "+ New Task"}
                </button>
            </div>

            {isFormOpen && (
                <TaskForm
                    subjectList={subjects}
                    addTask={(t) => { addTask(t); setFormOpen(false); }}
                />
            )}

            <div className="task-grid">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            {...task}
                            onDelete={() => deleteTask(task.id)}
                            onUpdate={updateTask}
                        />
                    ))
                ) : (
                    <p className="no-tasks">No tasks found for this view.</p>
                )}
            </div>
        </div>
    );
}