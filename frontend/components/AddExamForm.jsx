"use client";

import { useRouter } from "next/navigation";

import { apiRequest } from "@/lib/api";
import ExamForm from "@/components/ExamForm";

export default function AddExamForm() {
  const router = useRouter();

  async function createExam(exam) {
    await apiRequest("/admin/exams", {
      method: "POST",
      body: JSON.stringify(exam)
    });
    router.push("/admin/manage-exams");
  }

  return <ExamForm submitLabel="Add Exam" onSubmit={createExam} />;
}
