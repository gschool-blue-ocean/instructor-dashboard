import express from 'express'
import {
    getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getMcspOverview,
} from '../controllers/teacherControllers.js'

const router = express.Router()

router.get('/', getTeacher)
router.post('/', createTeacher)
router.patch('/:teacherId', updateTeacher)
router.delete('/:teacherId', deleteTeacher)
router.get('/mcspOverview/:mcsp', getMcspOverview)

export default router
