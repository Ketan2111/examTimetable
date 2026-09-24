import AuthGate from "@/components/AuthGate";
import DashboardHeader from "@/components/DashboardHeader";

export default function StudentDashboardPage() {
  return (
    <AuthGate requiredRole="student">
      <DashboardHeader title="Student Dashboard" />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <a
          href="/student/my-timetable"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          My Timetable
        </a>
      </main>
    </AuthGate>
  );
}
