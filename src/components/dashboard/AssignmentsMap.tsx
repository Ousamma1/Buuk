import { AssignmentPin } from "@/data/mockData";

const STATUS_COLORS: Record<AssignmentPin["status"], string> = {
  not_started: "rgba(255,255,255,0.8)",
  in_progress: "#52c7ea",
  submitted: "#4ad395",
  overdue: "#ff5f6d",
};

function normalizeDubaiCoordinates(pin: AssignmentPin) {
  const latRange = { min: 25.0, max: 25.3 };
  const lngRange = { min: 55.1, max: 55.4 };
  const x = ((pin.lng - lngRange.min) / (lngRange.max - lngRange.min)) * 100;
  const y = (1 - (pin.lat - latRange.min) / (latRange.max - latRange.min)) * 100;
  return { x, y };
}

export function AssignmentsMap({ pins }: { pins: AssignmentPin[] }) {
  return (
    <section
      className="glass-panel dark"
      style={{
        position: "relative",
        padding: "1.4rem",
        overflow: "hidden",
        minHeight: "360px",
      }}
    >
      <div className="section-title">Assignments Map — Dubai</div>
      <div
        style={{
          position: "relative",
          borderRadius: "var(--border-radius-lg)",
          overflow: "hidden",
          minHeight: "280px",
          background:
            "radial-gradient(circle at 20% 30%, rgba(82,199,234,0.28), transparent 55%)," +
            "radial-gradient(circle at 70% 40%, rgba(42,63,120,0.65), transparent 60%)," +
            "linear-gradient(135deg, rgba(12,22,48,0.75), rgba(8,14,26,0.9))",
          border: "1px solid rgba(82,199,234,0.35)",
        }}
      >
        <div className="grid-overlay" style={{ opacity: 0.25 }} />
        {pins.map((pin) => {
          const { x, y } = normalizeDubaiCoordinates(pin);
          return (
            <div
              key={pin.id}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <div
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "999px",
                  background: "rgba(5,7,15,0.72)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                }}
              >
                {pin.name}
              </div>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: STATUS_COLORS[pin.status],
                  boxShadow: `0 0 0 6px ${STATUS_COLORS[pin.status]}22, 0 0 12px ${STATUS_COLORS[pin.status]}`,
                  border: "2px solid rgba(5,7,15,0.6)",
                }}
              />
            </div>
          );
        })}
      </div>
      <footer style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <span
            key={status}
            className="badge"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.85)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: color,
                boxShadow: `0 0 0 4px ${color}33`,
              }}
            />
            {status.replace("_", " ")}
          </span>
        ))}
      </footer>
    </section>
  );
}
