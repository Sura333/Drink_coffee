import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function GetStarted() {
  return (
    <div className="app-container fade-in" style={{ minHeight: "100vh", background: "var(--color-background)" }}>
      <header className="app-navbar" style={{ justifyContent: 'center', background: 'transparent', boxShadow: 'none' }}>
        <span
          className="logo"
          style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            letterSpacing: '0.06em',
            color: 'var(--color-primary)',
            textShadow: '0 4px 24px rgba(124,60,237,0.10), 0 1.5px 4px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
            fontFamily: '"Segoe UI", "Inter", Arial, sans-serif',
            margin: '2.5rem 0 1.5rem 0',
            lineHeight: 1.1
          }}
        >
          <span style={{ fontSize: '2.2em', marginRight: '0.2em' }}>☕</span>
          Drink <span style={{ color: 'var(--color-accent)', marginLeft: '0.2em' }}>Coffee</span>
        </span>
      </header>
      <main className="main-content flex-center" style={{ flex: 1 }}>
        <div className="card shadow text-center">
          <h1 style={{ fontSize: "2.2rem", marginBottom: "1.5rem", fontWeight: 700 }}>Get Started</h1>
          <Link to="/login" className="btn btn-accent" style={{ fontSize: "1.1rem", padding: "0.8em 2em" }}>
            Login
          </Link>
        </div>
      </main>
    </div>
  );
}
