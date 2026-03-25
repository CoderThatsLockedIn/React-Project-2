import React from "react";
import useTasks from "../hooks/useTasks";
import useSubjects from "../hooks/useSubjects";
import useTopics from "../hooks/useTopics";

export default function RevisionPlanner() {
    const { tasks } = useTasks();
    const { subjects } = useSubjects();
    const { topics } = useTopics();

    // Logic to find "High Priority" items across the app
    const urgentTasks = tasks.filter(t => t.priority === "High" && !t.isCompleted);
    const difficultTopics = topics.filter(t => t.difficulty === "Hard" && t.status !== "Mastered");

    return (
        <div className="planner-cont">
            <h1>Revision Planner</h1>
            <p>Today is {new Date().toLocaleDateString()}</p>

            <section className="urgent-section">
                <h3>🔥 Immediate Focus (High Priority Tasks)</h3>
                {urgentTasks.length > 0 ? (
                    <ul>
                        {urgentTasks.map(task => (
                            <li key={task.id}>
                                <strong>{task.title}</strong> - Due: {task.deadline}
                            </li>
                        ))}
                    </ul>
                ) : <p>All high-priority tasks are clear!</p>}
            </section>

            <section className="study-section">
                <h3>📚 Knowledge Gaps (Hard Topics)</h3>
                {difficultTopics.length > 0 ? (
                    <div className="topic-grid">
                        {difficultTopics.map(topic => {
                            const parentSub = subjects.find(s => s.id === topic.subjectId);
                            return (
                                <div key={topic.id} className="planner-card">
                                    <h4>{topic.name}</h4>
                                    <span>Subject: {parentSub?.subject || "Unknown"}</span>
                                    <p>Notes: {topic.notes || "No notes yet."}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : <p>No "Hard" topics flagged for revision.</p>}
            </section>
        </div>
    );
}