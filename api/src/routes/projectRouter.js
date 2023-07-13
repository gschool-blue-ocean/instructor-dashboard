import express from 'express'
import { getProject, deleteProject } from '../controllers/projectController.js'

const router = express.Router()

router.get('/', getProject)
router.delete('/:mcspId', deleteProject)

export default router
