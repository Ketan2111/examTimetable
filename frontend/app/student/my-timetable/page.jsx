import AuthGate from "@/components/AuthGate";
import DashboardHeader from "@/components/DashboardHeader";
import StudentTimetable from "@/components/StudentTimetable";

export default function MyTimetablePage() {
  return (
    <AuthGate requiredRole="student">
      <DashboardHeader title="My Timetable" />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <StudentTimetable />
      </main>
    </AuthGate>
  );
}
