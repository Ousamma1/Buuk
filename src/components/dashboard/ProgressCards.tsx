import { SurveyProgressMetric } from "@/data/mockData";

function ProgressBar({ value }: { value: number }) {
  return (
    <div
      style={{
        height: "8px",
        borderRadius: "999px",
        background: "rgba(14,27,61,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${Math.round(value * 100)}%`,
          height: "100%",
          background: "linear-gradient(90deg, #52c7ea, #2a3f78)",
          boxShadow: "0 10px 20px rgba(82,199,234,0.35)",
        }}
      />
    </div>
  );
}

function Trend({ trend }: { trend: number }) {
  const positive = trend >= 0;
  return (
    <span
      className={`badge ${positive ? "success" : "warning"}`}
      style={{
        background: positive
          ? "rgba(74,211,149,0.18)"
          : "rgba(249,160,63,0.18)",
        border: `1px solid ${positive ? "rgba(74,211,149,0.4)" : "rgba(249,160,63,0.4)"}`,
        color: positive ? "#b4ffdd" : "#ffe2c2",
      }}
    >
      {positive ? "▲" : "▼"} {Math.abs(trend)}%
    </span>
  );
}

export function ProgressCards({ metrics }: { metrics: SurveyProgressMetric[] }) {
  return (
    <section className="card-grid three">
      {metrics.map((metric) => {
        const completion = metric.submitted / metric.assigned;
        return (
          <article
            key={metric.id}
            className="glass-panel"
            style={{
              padding: "1.4rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--primary-dark)" }}>
                {metric.title}
              </h3>
              <Trend trend={metric.trend} />
            </div>
            <div style={{ display: "flex", gap: "1.4rem", alignItems: "baseline" }}>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--primary-dark)" }}>
                  {metric.submitted}
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                  of {metric.assigned} assigned
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                  Started {metric.started}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                  Avg time {metric.avgTime}
                </span>
              </div>
            </div>
            <ProgressBar value={completion} />
          </article>
        );
      })}
    </section>
  );
}
