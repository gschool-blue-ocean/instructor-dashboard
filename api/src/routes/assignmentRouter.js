import express from 'express'
import {
    getAssignment,
    updatedAssignment,
    deleteAssignment,
} from '../controllers/assignmentController.js'

const router = express.Router()

router.get('/', getAssignment)
router.patch('/', updatedAssignment)
router.delete('/:assignmentId', deleteAssignment)

export default router
