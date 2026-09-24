import { pool } from "../config/db.js";

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function formatExam(row) {
  return {
    id: row.id,
    subject: row.subject,
    academicYear: row.academicYear,
    section: row.section,
    examDate: row.examDate,
    startTime: row.startTime,
    endTime: row.endTime,
    status: row.status
  };
}

function validateExamInput(body) {
  const subject = cleanText(body.subject);
  const academicYear = cleanText(body.academicYear);
  const section = cleanText(body.section);
  const examDate = cleanText(body.examDate);
  const startTime = cleanText(body.startTime);
  const endTime = cleanText(body.endTime);

  if (!subject || !academicYear || !section || !examDate || !startTime || !endTime) {
    return { error: "All exam fields are required" };
  }

  if (startTime >= endTime) {
    return { error: "Start time must be before end time" };
  }

  return {
    exam: {
      subject,
      academicYear,
      section,
      examDate,
      startTime,
      endTime
    }
  };
}

async function getExamById(id) {
  const [rows] = await pool.query(
    `SELECT id, subject, academic_year AS academicYear, section,
            DATE_FORMAT(exam_date, '%Y-%m-%d') AS examDate,
            TIME_FORMAT(start_time, '%H:%i') AS startTime,
            TIME_FORMAT(end_time, '%H:%i') AS endTime,
            status
     FROM exams
     WHERE id = ?`,
    [id]
  );

  return rows.length > 0 ? formatExam(rows[0]) : null;
}

export async function createExam(req, res, next) {
  try {
    const { error, exam } = validateExamInput(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const [result] = await pool.query(
      `INSERT INTO exams
        (subject, academic_year, section, exam_date, start_time, end_time, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        exam.subject,
        exam.academicYear,
        exam.section,
        exam.examDate,
        exam.startTime,
        exam.endTime,
        req.user.id
      ]
    );

    const createdExam = await getExamById(result.insertId);
    res.status(201).json({ exam: createdExam });
  } catch (error) {
    next(error);
  }
}

export async function getAdminExams(req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT id, subject, academic_year AS academicYear, section,
              DATE_FORMAT(exam_date, '%Y-%m-%d') AS examDate,
              TIME_FORMAT(start_time, '%H:%i') AS startTime,
              TIME_FORMAT(end_time, '%H:%i') AS endTime,
              status
       FROM exams
       ORDER BY exam_date ASC, start_time ASC, subject ASC`
    );

    res.json({ exams: rows.map(formatExam) });
  } catch (error) {
    next(error);
  }
}

export async function updateExam(req, res, next) {
  try {
    const examId = Number(req.params.id);
    const { error, exam } = validateExamInput(req.body);

    if (!Number.isInteger(examId) || examId <= 0) {
      return res.status(400).json({ message: "Invalid exam id" });
    }

    if (error) {
      return res.status(400).json({ message: error });
    }

    const [result] = await pool.query(
      `UPDATE exams
       SET subject = ?, academic_year = ?, section = ?, exam_date = ?,
           start_time = ?, end_time = ?
       WHERE id = ?`,
      [
        exam.subject,
        exam.academicYear,
        exam.section,
        exam.examDate,
        exam.startTime,
        exam.endTime,
        examId
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const updatedExam = await getExamById(examId);
    res.json({ exam: updatedExam });
  } catch (error) {
    next(error);
  }
}

export async function deleteExam(req, res, next) {
  try {
    const examId = Number(req.params.id);

    if (!Number.isInteger(examId) || examId <= 0) {
      return res.status(400).json({ message: "Invalid exam id" });
    }

    const [result] = await pool.query("DELETE FROM exams WHERE id = ?", [examId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json({ message: "Exam removed" });
  } catch (error) {
    next(error);
  }
}

export async function cancelExam(req, res, next) {
  try {
    const examId = Number(req.params.id);

    if (!Number.isInteger(examId) || examId <= 0) {
      return res.status(400).json({ message: "Invalid exam id" });
    }

    const [result] = await pool.query(
      "UPDATE exams SET status = 'cancelled' WHERE id = ?",
      [examId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const cancelledExam = await getExamById(examId);
    res.json({ exam: cancelledExam });
  } catch (error) {
    next(error);
  }
}

export async function getStudentExams(req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT id, subject, academic_year AS academicYear, section,
              DATE_FORMAT(exam_date, '%Y-%m-%d') AS examDate,
              TIME_FORMAT(start_time, '%H:%i') AS startTime,
              TIME_FORMAT(end_time, '%H:%i') AS endTime,
              status
       FROM exams
       WHERE academic_year = ? AND section = ?
       ORDER BY exam_date ASC, start_time ASC, subject ASC`,
      [req.user.academicYear, req.user.section]
    );

    res.json({ exams: rows.map(formatExam) });
  } catch (error) {
    next(error);
  }
}
