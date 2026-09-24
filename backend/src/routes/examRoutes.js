import express from "express";

import {
  cancelExam,
  createExam,
  deleteExam,
  getAdminExams,
  getStudentExams,
  updateExam
} from "../controllers/examController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

router.get("/admin/exams", requireRole("admin"), getAdminExams);
router.post("/admin/exams", requireRole("admin"), createExam);
router.put("/admin/exams/:id", requireRole("admin"), updateExam);
router.patch("/admin/exams/:id/cancel", requireRole("admin"), cancelExam);
router.delete("/admin/exams/:id", requireRole("admin"), deleteExam);

router.get("/student/exams", requireRole("student"), getStudentExams);

export default router;
