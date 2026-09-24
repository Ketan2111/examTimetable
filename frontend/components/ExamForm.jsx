"use client";

import { useState } from "react";

const emptyExam = {
  subject: "",
  academicYear: "",
  section: "",
  examDate: "",
  startTime: "",
  endTime: ""
};

export default function ExamForm({
  initialExam = emptyExam,
  submitLabel = "Save Exam",
  onSubmit
}) {
  const [exam, setExam] = useState({ ...emptyExam, ...initialExam });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setExam((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit(exam);
      setMessage("Exam saved.");

      if (!initialExam.id) {
        setExam(emptyExam);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Subject</span>
          <input
            type="text"
            value={exam.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Academic Year</span>
          <input
            type="text"
            value={exam.academicYear}
            onChange={(event) => updateField("academicYear", event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Section</span>
          <input
            type="text"
            value={exam.section}
            onChange={(event) => updateField("section", event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Exam Date</span>
          <input
            type="date"
            value={exam.examDate}
            onChange={(event) => updateField("examDate", event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Start Time</span>
          <input
            type="time"
            value={exam.startTime}
            onChange={(event) => updateField("startTime", event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">End Time</span>
          <input
            type="time"
            value={exam.endTime}
            onChange={(event) => updateField("endTime", event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            required
          />
        </label>
      </div>

      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
