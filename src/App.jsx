import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// Import CSS
import "./layout.css";

// Import Pages
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';
import RevisionPlanner from './pages/RevisionPlanner';
import AITools from './pages/AITools';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* --- SIDEBAR NAVIGATION --- */}
        <nav className="sidebar">
          <div className="sidebar-logo">
            <span>🎓</span> StudySync AI
          </div>
          
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="icon">📊</span>
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/subjects" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="icon">📚</span>
              <span>Subjects</span>
            </NavLink>

            <NavLink to="/tasks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="icon">✅</span>
              <span>Tasks</span>
            </NavLink>

            <NavLink to="/planner" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="icon">📅</span>
              <span>Revision</span>
            </NavLink>

            <NavLink to="/ai" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="icon">🤖</span>
              <span>AI Assistant</span>
            </NavLink>
          </div>

          <div className="sidebar-footer">
            <p>© 2026 StudySync</p>
          </div>
        </nav>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/planner" element={<RevisionPlanner />} />
            <Route path="/ai" element={<AITools />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;