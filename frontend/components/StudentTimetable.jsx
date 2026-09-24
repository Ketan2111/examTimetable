"use client";

import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";
import ExamTable from "@/components/ExamTable";

export default function StudentTimetable() {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTimetable() {
      try {
        const data = await apiRequest("/student/exams");
        setExams(data.exams);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadTimetable();
  }, []);

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading timetable...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-700">{error}</p>;
  }

  return <ExamTable exams={exams} />;
}
