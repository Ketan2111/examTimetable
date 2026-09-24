import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-ink">Login</h1>
        <p className="mt-2 text-sm text-slate-600">Use your college account to continue.</p>
        <LoginForm />
      </section>
    </main>
  );
}
