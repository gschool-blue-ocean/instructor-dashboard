import express from 'express'
import {
    getAssessment,
    deleteAssessment,
    updatedAssessment,
    getStudentAssessment,
} from '../controllers/assessmentController.js'

const router = express.Router()

router.get('/', getAssessment)
router.patch('/:assessmentId', updatedAssessment)
router.get('/:studentId', getStudentAssessment)
router.delete('/:mcspId', deleteAssessment)

export default router
