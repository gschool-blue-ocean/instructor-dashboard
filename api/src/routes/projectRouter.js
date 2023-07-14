import express from 'express'
import {
    getProject,
    deleteProject,
    updateProject,
    getStudentProject,
    updateProjectCompletion,
} from '../controllers/projectController.js'

const router = express.Router()

router.get('/', getProject)
router.patch('/:projectId', updateProject)
router.patch('/completion/:projectId', updateProjectCompletion)
router.get('/:studentId', getStudentProject)
router.delete('/:mcspId', deleteProject)

export default router
