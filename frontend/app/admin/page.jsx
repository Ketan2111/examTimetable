import AuthGate from "@/components/AuthGate";
import DashboardHeader from "@/components/DashboardHeader";

export default function AdminDashboardPage() {
  return (
    <AuthGate requiredRole="admin">
      <DashboardHeader title="Admin Dashboard" />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/admin/add-exam"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Add Exam
          </a>
          <a
            href="/admin/manage-exams"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Manage Exams
          </a>
        </div>
      </main>
    </AuthGate>
  );
}
