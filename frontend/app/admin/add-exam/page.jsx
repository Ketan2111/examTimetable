import AuthGate from "@/components/AuthGate";
import AddExamForm from "@/components/AddExamForm";
import DashboardHeader from "@/components/DashboardHeader";

export default function AddExamPage() {
  return (
    <AuthGate requiredRole="admin">
      <DashboardHeader title="Add Exam" />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <AddExamForm />
      </main>
    </AuthGate>
  );
}
