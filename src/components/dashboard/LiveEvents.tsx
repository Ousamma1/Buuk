import { LiveEvent } from "@/data/mockData";

const EVENT_COLORS: Record<LiveEvent["type"], string> = {
  response: "#52c7ea",
  assignment: "#f9a03f",
  email: "#4ad395",
};

export function LiveEvents({ events }: { events: LiveEvent[] }) {
  return (
    <section
      className="glass-panel dark"
      style={{ padding: "1.4rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}
    >
      <div className="section-title">Live Event Stream</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.8rem 1rem",
              borderRadius: "var(--border-radius-sm)",
              background: "rgba(5,7,15,0.45)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", width: "48px" }}>
              {event.ts}
            </span>
            <span
              className="badge"
              style={{
                background: `${EVENT_COLORS[event.type]}33`,
                border: `1px solid ${EVENT_COLORS[event.type]}55`,
                color: "white",
              }}
            >
              {event.type}
            </span>
            <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>{event.message}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
