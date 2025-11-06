import { SurveyComparisonMetric } from "@/data/mockData";

function ComparisonBar({
  label,
  a,
  b,
}: {
  label: string;
  a: number;
  b: number;
}) {
  const maxValue = 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
        <span>{label}</span>
        <span style={{ color: "rgba(10,16,35,0.6)" }}>
          {a}% vs {b}%
        </span>
      </div>
      <div
        style={{
          position: "relative",
          height: "10px",
          borderRadius: "999px",
          background: "rgba(14,27,61,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scaleX(${a / maxValue})`,
            transformOrigin: "left",
            background: "linear-gradient(90deg, rgba(82,199,234,0.85), rgba(42,63,120,0.85))",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scaleX(${b / maxValue})`,
            transformOrigin: "left",
            background: "rgba(10,16,35,0.18)",
          }}
        />
      </div>
    </div>
  );
}

export function SurveyComparison({ metrics }: { metrics: SurveyComparisonMetric[] }) {
  return (
    <section
      className="glass-panel"
      style={{ padding: "1.4rem", display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div className="section-title">Compare Surveys</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span className="badge" style={{ background: "rgba(82,199,234,0.16)", color: "var(--primary-dark)" }}>
            Downtown Footfall
          </span>
          <span style={{ color: "rgba(10,16,35,0.45)" }}>vs</span>
          <span className="badge" style={{ background: "rgba(10,27,61,0.08)", color: "var(--primary-dark)" }}>
            Marina Retail NPS
          </span>
        </div>
        <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Δ = Survey A - Survey B</span>
      </div>
      <div className="card-grid" style={{ gap: "0.8rem" }}>
        {metrics.map((metric) => (
          <div key={metric.dimension} className="glass-panel" style={{ padding: "1rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {metric.dimension}
            </span>
            <div style={{ margin: "0.6rem 0" }}>
              <ComparisonBar label={metric.dimension} a={metric.surveyA} b={metric.surveyB} />
            </div>
            <strong style={{ fontSize: "1.1rem", color: "var(--primary-dark)" }}>
              +{metric.surveyA - metric.surveyB}%
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}
