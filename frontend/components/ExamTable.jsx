"use client";

function statusClasses(status) {
  if (status === "cancelled") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-green-200 bg-green-50 text-green-700";
}

export default function ExamTable({ exams, actions }) {
  if (exams.length === 0) {
    return <p className="text-sm text-slate-600">No exams available.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-slate-700">Subject</th>
            <th className="px-4 py-3 text-left font-medium text-slate-700">Academic Year</th>
            <th className="px-4 py-3 text-left font-medium text-slate-700">Section</th>
            <th className="px-4 py-3 text-left font-medium text-slate-700">Exam Date</th>
            <th className="px-4 py-3 text-left font-medium text-slate-700">Time</th>
            <th className="px-4 py-3 text-left font-medium text-slate-700">Status</th>
            {actions ? <th className="px-4 py-3 text-left font-medium text-slate-700">Actions</th> : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td className="px-4 py-3 text-slate-900">{exam.subject}</td>
              <td className="px-4 py-3 text-slate-700">{exam.academicYear}</td>
              <td className="px-4 py-3 text-slate-700">{exam.section}</td>
              <td className="px-4 py-3 text-slate-700">{exam.examDate}</td>
              <td className="px-4 py-3 text-slate-700">
                {exam.startTime} - {exam.endTime}
              </td>
              <td className="px-4 py-3">
                <span className={`rounded-full border px-2 py-1 text-xs font-medium ${statusClasses(exam.status)}`}>
                  {exam.status}
                </span>
              </td>
              {actions ? <td className="px-4 py-3">{actions(exam)}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
