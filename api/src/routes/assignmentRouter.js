import express from "express";
import {
    getAssignment,
    updatedAssignment,
    deleteAssignment,
    getStudentAssignment,
} from '../controllers/assignmentController.js'


const router = express.Router();

router.get('/', getAssignment)
router.get('/student/:studentId', getStudentAssignment)
router.patch('/completion/:assignmentId', updatedAssignment)
router.delete('/:assignmentId', deleteAssignment)

export default router;
