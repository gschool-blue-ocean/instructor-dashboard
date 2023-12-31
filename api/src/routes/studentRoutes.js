import express from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentProject,
  getStudentOverview,
  getStudentAssessment,
  getStudentsByMcsp,
  getStudentInfo,
  getStudentById,
} from "../controllers/studentControllers.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/overview/:studentId", getStudentOverview);
router.get("/studentProject/:studentId", getStudentProject);
router.post("/", createStudent);
router.patch("/:studentId", updateStudent);
router.delete("/:studentId", deleteStudent);
router.get("/assessment/:studentId", getStudentAssessment);
router.get("/mcsp/:mcsp", getStudentsByMcsp);
router.get("/studentInfo/:email", getStudentInfo);
router.get("/id/:studentId", getStudentById);
export default router;
