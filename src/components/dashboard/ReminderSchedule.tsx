import type { CSSProperties } from "react";
import { Reminder } from "@/data/mockData";

const STATUS_STYLE: Record<
  Reminder["status"],
  { label: string; className: string; style: CSSProperties }
> = {
  scheduled: {
    label: "Scheduled",
    className: "badge",
    style: {
      background: "rgba(82,199,234,0.16)",
      border: "1px solid rgba(82,199,234,0.3)",
      color: "var(--primary-dark)",
    },
  },
  running: {
    label: "Running",
    className: "badge success",
    style: {},
  },
  paused: {
    label: "Paused",
    className: "badge warning",
    style: {},
  },
};

export function ReminderSchedule({ reminders }: { reminders: Reminder[] }) {
  return (
    <section className="glass-panel" style={{ padding: "1.4rem" }}>
      <div className="section-title">Reminder Cadence</div>
      <div className="card-grid" style={{ gap: "1rem" }}>
        {reminders.map((reminder) => {
          const status = STATUS_STYLE[reminder.status];
          return (
            <div
              key={reminder.id}
              className="glass-panel"
              style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ margin: 0 }}>{reminder.survey}</h4>
                <span className={status.className} style={status.style}>
                  {status.label}
                </span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{reminder.cadence}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                }}
              >
                <span>Next send</span>
                <strong style={{ color: "var(--primary-dark)" }}>{reminder.nextSend}</strong>
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                Recipients <strong style={{ color: "var(--primary-dark)" }}>{reminder.recipients}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
