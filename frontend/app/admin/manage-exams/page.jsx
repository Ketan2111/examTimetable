import AuthGate from "@/components/AuthGate";
import DashboardHeader from "@/components/DashboardHeader";
import ManageExams from "@/components/ManageExams";

export default function ManageExamsPage() {
  return (
    <AuthGate requiredRole="admin">
      <DashboardHeader title="Manage Exams" />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <ManageExams />
      </main>
    </AuthGate>
  );
}
