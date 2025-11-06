import { TeamMemberStatus } from "@/data/mockData";

const STATUS_LABELS: Record<TeamMemberStatus["status"], { label: string; tone: "success" | "warning" | "danger" | "default" }> = {
  submitted: { label: "Submitted", tone: "success" },
  in_progress: { label: "In Progress", tone: "warning" },
  not_started: { label: "Not Started", tone: "default" },
  overdue: { label: "Overdue", tone: "danger" },
};

export function TeamStatus({ team }: { team: TeamMemberStatus[] }) {
  return (
    <section className="glass-panel" style={{ padding: "1.4rem" }}>
      <div className="section-title">Surveyor Status</div>
      <table className="table">
        <thead>
          <tr>
            <th>Surveyor</th>
            <th>Location</th>
            <th>Assignments</th>
            <th>Completed</th>
            <th>Last Sync</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {team.map((member) => {
            const status = STATUS_LABELS[member.status];
            return (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.location}</td>
                <td>{member.assignments}</td>
                <td>{member.completed}</td>
                <td>{member.lastSync}</td>
                <td>
                  <span
                    className={`badge ${status.tone !== "default" ? status.tone : ""}`}
                    style={
                      status.tone === "default"
                        ? {
                            background: "rgba(14,27,61,0.08)",
                            border: "1px solid rgba(14,27,61,0.15)",
                            color: "var(--primary-dark)",
                          }
                        : undefined
                    }
                  >
                    {status.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
