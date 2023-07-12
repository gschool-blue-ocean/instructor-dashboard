import express from 'express'
import {
    getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
} from '../controllers/teacherControllers.js'

const router = express.Router()

router.get('/', getTeacher)
router.post('/', createTeacher)
router.patch('/:teacherId', updateTeacher)
router.delete('/:teacherId', deleteTeacher)

export default router
