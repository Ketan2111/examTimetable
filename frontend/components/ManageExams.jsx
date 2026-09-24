"use client";

import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";
import ExamForm from "@/components/ExamForm";
import ExamTable from "@/components/ExamTable";

export default function ManageExams() {
  const [exams, setExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function loadExams() {
    setError("");

    try {
      const data = await apiRequest("/admin/exams");
      setExams(data.exams);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadExams();
  }, []);

  async function updateExam(exam) {
    const data = await apiRequest(`/admin/exams/${editingExam.id}`, {
      method: "PUT",
      body: JSON.stringify(exam)
    });

    setExams((current) =>
      current.map((item) => (item.id === data.exam.id ? data.exam : item))
    );
    setEditingExam(null);
  }

  async function cancelExam(examId) {
    const data = await apiRequest(`/admin/exams/${examId}/cancel`, {
      method: "PATCH"
    });

    setExams((current) =>
      current.map((item) => (item.id === data.exam.id ? data.exam : item))
    );
  }

  async function removeExam(examId) {
    await apiRequest(`/admin/exams/${examId}`, { method: "DELETE" });
    setExams((current) => current.filter((exam) => exam.id !== examId));
  }

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading exams...</p>;
  }

  return (
    <div className="space-y-6">
      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      {editingExam ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink">Edit Exam</h2>
            <button
              type="button"
              onClick={() => setEditingExam(null)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel Edit
            </button>
          </div>
          <ExamForm
            key={editingExam.id}
            initialExam={editingExam}
            submitLabel="Update Exam"
            onSubmit={updateExam}
          />
        </section>
      ) : null}

      <ExamTable
        exams={exams}
        actions={(exam) => (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setEditingExam(exam)}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => cancelExam(exam.id)}
              disabled={exam.status === "cancelled"}
              className="rounded-md border border-amber-300 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => removeExam(exam.id)}
              className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        )}
      />
    </div>
  );
}
