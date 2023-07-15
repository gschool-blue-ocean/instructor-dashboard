import express from 'express'
import {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentProject,
    getStudentOverview,
    getStudentAssessment,
} from '../controllers/studentControllers.js'

const router = express.Router()

router.get('/', getStudents)
router.get('/overview/:studentId', getStudentOverview)
router.get('/studentProject/:studentId', getStudentProject)
router.post('/', createStudent)
router.patch('/:studentId', updateStudent)
router.delete('/:studentId', deleteStudent)
router.get('/assessment/:studentId', getStudentAssessment)

export default router
