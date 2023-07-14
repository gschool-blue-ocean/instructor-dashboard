import express from 'express'
import {
    getProject,
    deleteProject,
    updateProject,
} from '../controllers/projectController.js'

const router = express.Router()

router.get('/', getProject)
router.patch('/projectId', updateProject)
router.delete('/:mcspId', deleteProject)

export default router
