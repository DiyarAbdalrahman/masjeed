import React from "react";

const sections = [
  "Dashboard",
  "Prayer Times",
  "Events",
  "Announcements",
  "Donations",
  "Settings",
  "Admins"
];

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">Masjeed Admin</div>
        <nav className="nav">
          {sections.map((label) => (
            <button key={label} className="nav-item" type="button">
              {label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="content">
        <header className="header">
          <h1>Dashboard</h1>
          <div className="meta">Masjid Salahuddin • Leicester</div>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Prayer Times</h3>
            <p>Upload monthly CSV or edit specific days.</p>
          </div>
          <div className="card">
            <h3>Announcements</h3>
            <p>Post Friday reminders and mosque updates.</p>
          </div>
          <div className="card">
            <h3>Donations</h3>
            <p>Manage active campaigns and presets.</p>
          </div>
        </section>

        <section className="section">
          <h2>Next Steps</h2>
          <ul>
            <li>Connect admin login</li>
            <li>Wire API endpoints</li>
            <li>CSV upload for prayer times</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
