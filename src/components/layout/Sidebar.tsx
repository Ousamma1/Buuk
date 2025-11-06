interface NavLink {
  label: string;
  badge?: string;
}

const links: NavLink[] = [
  { label: "Dashboard" },
  { label: "Surveys", badge: "3 active" },
  { label: "Assignments", badge: "18 due" },
  { label: "Surveyors", badge: "12" },
  { label: "Logic Builder" },
  { label: "Themes" },
  { label: "Email Center", badge: "2 queued" },
  { label: "Audit Trail" },
];

export function Sidebar() {
  return (
    <aside
      className="glass-panel"
      style={{
        width: "280px",
        padding: "1.8rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.35rem",
                margin: 0,
                color: "var(--primary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Buuk Admin
            </h1>
            <p
              style={{
                margin: "0.35rem 0 0",
                fontSize: "0.85rem",
                color: "var(--muted)",
              }}
            >
              Liquid-glass console
            </p>
          </div>
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(82,199,234,0.85), rgba(14,27,61,0.85))",
              display: "grid",
              placeItems: "center",
              color: "white",
              fontWeight: 600,
              boxShadow: "0 20px 40px rgba(82,199,234,0.25)",
            }}
          >
            BA
          </div>
        </div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {links.map((link) => (
          <a
            key={link.label}
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderRadius: "var(--border-radius-sm)",
              background: "rgba(255,255,255,0.4)",
              color: "var(--primary-dark)",
              fontWeight: 600,
              letterSpacing: "0.04em",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <span>{link.label}</span>
            {link.badge && (
              <span
                className="badge"
                style={{
                  background: "rgba(14,27,61,0.06)",
                  borderColor: "rgba(14,27,61,0.2)",
                  color: "var(--primary-dark)",
                }}
              >
                {link.badge}
              </span>
            )}
          </a>
        ))}
      </nav>

      <div
        className="glass-panel dark"
        style={{
          padding: "1.4rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        <span className="tag" style={{ alignSelf: "flex-start" }}>
          Live Sync Enabled
        </span>
        <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Response Stream</h2>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.72)", fontSize: "0.85rem" }}>
          Stream processor caught up • Kafka lag <strong>0.4s</strong>
        </p>
        <div className="fade-divider" style={{ background: "rgba(255,255,255,0.2)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.68)" }}>
            Current focus
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <button
              type="button"
              style={{
                background: "rgba(82,199,234,0.18)",
                color: "white",
                border: "1px solid rgba(82,199,234,0.4)",
                padding: "0.55rem 0.9rem",
                borderRadius: "var(--border-radius-sm)",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Launch Survey Builder
            </button>
            <button
              type="button"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.14)",
                padding: "0.55rem 0.9rem",
                borderRadius: "var(--border-radius-sm)",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Manage Themes
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
