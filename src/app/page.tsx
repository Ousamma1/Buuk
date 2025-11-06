import {
  assignmentPins,
  comparisonMetrics,
  liveEvents,
  progressMetrics,
  reminders,
  teamStatuses,
} from "@/data/mockData";
import { AssignmentsMap } from "@/components/dashboard/AssignmentsMap";
import { ProgressCards } from "@/components/dashboard/ProgressCards";
import { SurveyComparison } from "@/components/dashboard/SurveyComparison";
import { LiveEvents } from "@/components/dashboard/LiveEvents";
import { ReminderSchedule } from "@/components/dashboard/ReminderSchedule";
import { TeamStatus } from "@/components/dashboard/TeamStatus";
import { LogicPreview } from "@/components/logic/LogicPreview";
import { ThemePreview } from "@/components/theme/ThemePreview";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatementUploader } from "@/components/StatementUploader";

export default function Page() {
  return (
    <main style={{ padding: "2.5rem", display: "flex", gap: "2rem" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.6rem" }}>
        <Header />
        <ProgressCards metrics={progressMetrics} />
        <div className="flex-row">
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <AssignmentsMap pins={assignmentPins} />
            <SurveyComparison metrics={comparisonMetrics} />
          </div>
          <div style={{ width: "360px", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <LiveEvents events={liveEvents} />
            <StatementUploader />
          </div>
        </div>
        <div className="flex-row">
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <TeamStatus team={teamStatuses} />
            <ReminderSchedule reminders={reminders} />
          </div>
          <div style={{ width: "380px", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <LogicPreview />
            <ThemePreview />
          </div>
        </div>
      </div>
    </main>
  );
}
