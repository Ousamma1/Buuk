export function Header() {
  return (
    <header
      className="glass-panel"
      style={{
        padding: "1.6rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "var(--border-radius-lg)",
      }}
    >
      <div>
        <div className="tag">Live view • updated 4s ago</div>
        <h2
          style={{
            margin: "0.65rem 0 0",
            fontSize: "2rem",
            color: "var(--primary-dark)",
            letterSpacing: "0.02em",
          }}
        >
          Field Operations Control Room
        </h2>
        <p style={{ margin: "0.45rem 0 0", color: "var(--muted)", maxWidth: "520px" }}>
          Track assignments across Dubai, monitor surveyor performance, and orchestrate reminders
          without leaving the console.
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          className="glass-panel dark"
          style={{
            padding: "1rem 1.2rem",
            borderRadius: "var(--border-radius-md)",
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            minWidth: "220px",
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.68)", letterSpacing: "0.04em" }}>
            Active Survey
          </span>
          <strong style={{ fontSize: "1rem" }}>Downtown Footfall</strong>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.68)" }}>
            121 submissions • SLA 97% on-time
          </span>
        </div>
        <button
          type="button"
          style={{
            background: "linear-gradient(135deg, #52c7ea, #2a3f78)",
            border: "none",
            color: "white",
            fontWeight: 600,
            letterSpacing: "0.05em",
            padding: "0.95rem 1.8rem",
            borderRadius: "var(--border-radius-md)",
            boxShadow: "0 25px 50px rgba(82,199,234,0.35)",
            cursor: "pointer",
          }}
        >
          New Assignment
        </button>
      </div>
    </header>
  );
}
