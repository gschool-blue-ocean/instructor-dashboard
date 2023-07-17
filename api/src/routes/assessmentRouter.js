import express from 'express'
import {
    getAssessment,
    deleteAssessment,
    updateAssessment,
    getStudentAssessment,
    updateAssessmentCompletion,
} from '../controllers/assesmentController.js'

const router = express.Router()

router.get('/', getAssessment)
router.patch('/:AssessmentId', updateAssessment)
router.patch('/completion/:AssessmentId', updateAssessmentCompletion)
router.get('/:studentId', getStudentAssessment)
router.delete('/:mcspId', deleteAssessment)

export default router
