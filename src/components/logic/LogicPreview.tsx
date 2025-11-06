interface LogicNode {
  id: string;
  label: string;
  type: "question" | "action";
  x: number;
  y: number;
}

const nodes: LogicNode[] = [
  { id: "q1", label: "Q3: Visited before?", type: "question", x: 12, y: 15 },
  { id: "cond1", label: "If answer = Yes", type: "action", x: 45, y: 30 },
  { id: "show", label: "Show Section B", type: "action", x: 75, y: 18 },
  { id: "cond2", label: "If answer = No", type: "action", x: 45, y: 60 },
  { id: "skip", label: "Skip to Thank You", type: "action", x: 75, y: 58 },
];

const edges: Array<[string, string]> = [
  ["q1", "cond1"],
  ["cond1", "show"],
  ["q1", "cond2"],
  ["cond2", "skip"],
];

export function LogicPreview() {
  return (
    <section className="glass-panel" style={{ padding: "1.4rem", position: "relative" }}>
      <div className="section-title">Logic Builder Snapshot</div>
      <div
        style={{
          position: "relative",
          minHeight: "260px",
          borderRadius: "var(--border-radius-lg)",
          background: "rgba(255,255,255,0.6)",
          overflow: "hidden",
        }}
      >
        <div className="grid-overlay" style={{ opacity: 0.35 }} />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0 }}
        >
          {edges.map(([from, to]) => {
            const start = nodes.find((node) => node.id === from)!;
            const end = nodes.find((node) => node.id === to)!;
            return (
              <path
                key={`${from}-${to}`}
                d={`M${start.x},${start.y} C ${start.x + 10},${start.y} ${end.x - 10},${end.y} ${end.x},${end.y}`}
                stroke="rgba(14,27,61,0.35)"
                strokeWidth={1.4}
                fill="none"
              />
            );
          })}
        </svg>
        {nodes.map((node) => (
          <div
            key={node.id}
            className="glass-panel"
            style={{
              position: "absolute",
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              padding: "0.65rem 0.9rem",
              borderRadius: "var(--border-radius-sm)",
              background:
                node.type === "question"
                  ? "linear-gradient(135deg, rgba(82,199,234,0.25), rgba(42,63,120,0.45))"
                  : "rgba(255,255,255,0.85)",
              color: node.type === "question" ? "white" : "var(--primary-dark)",
              border: node.type === "question"
                ? "1px solid rgba(82,199,234,0.55)"
                : "1px solid rgba(14,27,61,0.1)",
              boxShadow: node.type === "question"
                ? "0 15px 35px rgba(82,199,234,0.35)"
                : "0 10px 25px rgba(14,27,61,0.12)",
              fontSize: "0.85rem",
            }}
          >
            {node.label}
          </div>
        ))}
      </div>
    </section>
  );
}
