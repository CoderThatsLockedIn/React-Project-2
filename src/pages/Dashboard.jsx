import React from "react";
import { useData } from "../context/DataContext";
import "./pages.css";

export default function Dashboard() {
    const { tasks, subjects } = useData();

    // --- 1. Basic Stats ---
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.isCompleted).length;
    
    const completionRate = totalTasks > 0 
        ? Math.round((completedTasks / totalTasks) * 100) 
        : 0;

    // --- 2. Subject Progress Bars ---
    const subjectProgress = subjects.map(sub => {
        const subTasks = tasks.filter(t => t.subject === sub.subject);
        const done = subTasks.filter(t => t.isCompleted).length;
        const percent = subTasks.length > 0 ? Math.round((done / subTasks.length) * 100) : 0;
        return { name: sub.subject, percent, color: sub.color };
    });

    // --- 3. LOGIC: Weekly Productivity Graph ---
    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            // Format as YYYY-MM-DD to match task deadlines
            const dateStr = d.toISOString().split('T')[0]; 
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
            
            // Count tasks completed on THIS specific date
            // (Assumes you have a 'completedAt' field or using 'deadline' as a fallback)
            const count = tasks.filter(t => t.isCompleted && t.deadline === dateStr).length;
            
            days.push({ dayName, count });
        }
        return days;
    };

    const weeklyData = getLast7Days();
    const maxTasks = Math.max(...weeklyData.map(d => d.count), 5); // Scale graph to at least 5

    return (
        <div className="dashboard-container">
            <h1>Study Progress Dashboard</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>{totalTasks}</h3>
                    <p>Total Tasks</p>
                </div>
                <div className="stat-card">
                    <h3>{completionRate}%</h3>
                    <p>Completion Rate</p>
                </div>
                <div className="stat-card">
                    <h3>{subjects.length}</h3>
                    <p>Active Subjects</p>
                </div>
            </div>

            <div className="progress-section">
                <h3>Subject Mastery</h3>
                {subjectProgress.map((sub, i) => (
                    <div key={i} className="subject-progress-item">
                        <div className="progress-info">
                            <span>{sub.name}</span>
                            <span>{sub.percent}%</span>
                        </div>
                        <div className="bar-bg">
                            <div 
                                className="bar-fill" 
                                style={{ width: `${sub.percent}%`, backgroundColor: sub.color }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- WORKING WEEKLY PRODUCTIVITY GRAPH --- */}
            <div className="productivity-section">
                <h3>Tasks Completed (Last 7 Days)</h3>
                <div className="graph-container">
                    <div className="graph-placeholder">
                        {weeklyData.map((data, i) => (
                            <div key={i} className="bar-wrapper">
                                {/* The height is a percentage of the max tasks found */}
                                <div 
                                    className="mock-bar" 
                                    style={{ height: `${(data.count / maxTasks) * 100}%` }}
                                    title={`${data.count} tasks`}
                                >
                                    {data.count > 0 && <span className="bar-value">{data.count}</span>}
                                </div>
                                <span className="days-label">{data.dayName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}