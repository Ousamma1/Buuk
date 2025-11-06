export type AssignmentStatus = "not_started" | "in_progress" | "submitted" | "overdue";

export interface AssignmentPin {
  id: string;
  name: string;
  neighborhood: string;
  status: AssignmentStatus;
  lat: number;
  lng: number;
  startedAt?: string;
  dueAt: string;
}

export interface SurveyProgressMetric {
  id: string;
  title: string;
  assigned: number;
  started: number;
  submitted: number;
  avgTime: string;
  trend: number;
}

export interface SurveyComparisonMetric {
  dimension: string;
  surveyA: number;
  surveyB: number;
}

export interface TeamMemberStatus {
  id: string;
  name: string;
  location: string;
  lastSync: string;
  assignments: number;
  completed: number;
  status: AssignmentStatus;
}

export interface Reminder {
  id: string;
  survey: string;
  cadence: string;
  nextSend: string;
  recipients: number;
  status: "scheduled" | "running" | "paused";
}

export interface LiveEvent {
  id: string;
  ts: string;
  type: "response" | "assignment" | "email";
  message: string;
}

export const progressMetrics: SurveyProgressMetric[] = [
  {
    id: "downtown",
    title: "Downtown Footfall",
    assigned: 180,
    started: 142,
    submitted: 121,
    avgTime: "08m 12s",
    trend: 12,
  },
  {
    id: "marina",
    title: "Marina Retail NPS",
    assigned: 96,
    started: 74,
    submitted: 66,
    avgTime: "06m 45s",
    trend: 6,
  },
  {
    id: "expo",
    title: "Expo Pavilion Feedback",
    assigned: 54,
    started: 39,
    submitted: 24,
    avgTime: "09m 01s",
    trend: -3,
  },
];

export const assignmentPins: AssignmentPin[] = [
  {
    id: "dxb-mall",
    name: "Dubai Mall",
    neighborhood: "Downtown",
    status: "in_progress",
    lat: 25.1972,
    lng: 55.2744,
    startedAt: "2025-11-06T10:22:00Z",
    dueAt: "2025-11-07T18:00:00Z",
  },
  {
    id: "dxb-marina",
    name: "Marina Walk",
    neighborhood: "Dubai Marina",
    status: "submitted",
    lat: 25.0803,
    lng: 55.1403,
    startedAt: "2025-11-05T08:40:00Z",
    dueAt: "2025-11-06T20:00:00Z",
  },
  {
    id: "dxb-deira",
    name: "Gold Souk",
    neighborhood: "Deira",
    status: "not_started",
    lat: 25.2711,
    lng: 55.3075,
    dueAt: "2025-11-08T14:00:00Z",
  },
  {
    id: "dxb-jumeirah",
    name: "La Mer",
    neighborhood: "Jumeirah",
    status: "overdue",
    lat: 25.2467,
    lng: 55.2846,
    startedAt: "2025-11-04T11:15:00Z",
    dueAt: "2025-11-06T10:00:00Z",
  },
];

export const comparisonMetrics: SurveyComparisonMetric[] = [
  { dimension: "Overall Satisfaction", surveyA: 82, surveyB: 76 },
  { dimension: "Staff Helpfulness", surveyA: 78, surveyB: 69 },
  { dimension: "Wait Time", surveyA: 64, surveyB: 71 },
  { dimension: "Likely to Recommend", surveyA: 88, surveyB: 81 },
];

export const teamStatuses: TeamMemberStatus[] = [
  {
    id: "sara",
    name: "Sara Al Maktoum",
    location: "Dubai Mall",
    lastSync: "2m ago",
    assignments: 6,
    completed: 4,
    status: "in_progress",
  },
  {
    id: "ibrahim",
    name: "Ibrahim Khan",
    location: "Marina Walk",
    lastSync: "Just now",
    assignments: 4,
    completed: 4,
    status: "submitted",
  },
  {
    id: "maya",
    name: "Maya Karam",
    location: "Gold Souk",
    lastSync: "14m ago",
    assignments: 5,
    completed: 1,
    status: "not_started",
  },
  {
    id: "liam",
    name: "Liam Pereira",
    location: "La Mer",
    lastSync: "45m ago",
    assignments: 3,
    completed: 1,
    status: "overdue",
  },
];

export const reminders: Reminder[] = [
  {
    id: "downtown-reminder",
    survey: "Downtown Footfall",
    cadence: "Daily at 08:00 GST",
    nextSend: "Today, 08:00",
    recipients: 32,
    status: "running",
  },
  {
    id: "marina-followup",
    survey: "Marina Retail NPS",
    cadence: "Every 3 days",
    nextSend: "Nov 8, 09:30",
    recipients: 18,
    status: "scheduled",
  },
  {
    id: "expo-deadline",
    survey: "Expo Pavilion Feedback",
    cadence: "One-off deadline",
    nextSend: "Nov 7, 17:00",
    recipients: 12,
    status: "paused",
  },
];

export const liveEvents: LiveEvent[] = [
  {
    id: "evt-1",
    ts: "14:05",
    type: "response",
    message: "Response submitted by Sara — Dubai Mall Q12 flagged follow-up",
  },
  {
    id: "evt-2",
    ts: "14:03",
    type: "assignment",
    message: "Assignment status updated to In Progress — Gold Souk",
  },
  {
    id: "evt-3",
    ts: "13:59",
    type: "email",
    message: "Reminder delivered to 18 surveyors for Marina Retail NPS",
  },
  {
    id: "evt-4",
    ts: "13:55",
    type: "response",
    message: "Response submitted by Liam — La Mer time to complete 06:21",
  },
];
