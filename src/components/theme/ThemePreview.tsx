export function ThemePreview() {
  return (
    <section className="glass-panel" style={{ padding: "1.4rem" }}>
      <div className="section-title">Theme Tokens</div>
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
        <div
          className="glass-panel"
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            minWidth: "220px",
          }}
        >
          <span style={{ fontSize: "0.8rem", letterSpacing: "0.08em", color: "var(--muted)" }}>Palette</span>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {[
              { label: "Primary", color: "#0E1B3D" },
              { label: "Secondary", color: "#2A3F78" },
              { label: "Accent", color: "#52C7EA" },
            ].map((token) => (
              <div key={token.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "16px",
                    background: token.color,
                    boxShadow: "0 12px 24px rgba(14,27,61,0.2)",
                  }}
                />
                <small style={{ display: "block", marginTop: "0.35rem" }}>{token.label}</small>
              </div>
            ))}
          </div>
        </div>
        <div
          className="glass-panel"
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            minWidth: "220px",
          }}
        >
          <span style={{ fontSize: "0.8rem", letterSpacing: "0.08em", color: "var(--muted)" }}>Surfaces</span>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "24px",
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 18px 36px rgba(14,27,61,0.24)",
              }}
            />
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "24px",
                background: "rgba(10,27,61,0.55)",
                border: "1px solid rgba(82,199,234,0.35)",
                boxShadow: "0 18px 36px rgba(5,7,15,0.45)",
              }}
            />
          </div>
        </div>
        <div
          className="glass-panel"
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            minWidth: "240px",
          }}
        >
          <span style={{ fontSize: "0.8rem", letterSpacing: "0.08em", color: "var(--muted)" }}>Motion & Radius</span>
          <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--muted)", fontSize: "0.85rem" }}>
            <li>Radius 16–20px across panels</li>
            <li>Backdrop blur 18px on glass surfaces</li>
            <li>Framer Motion micro-interactions (hover & focus)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
