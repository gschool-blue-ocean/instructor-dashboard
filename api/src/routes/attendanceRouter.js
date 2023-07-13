import express from 'express'
import {
    createAttendance,
    updateAttendance,
} from '../controllers/attendanceController.js'

const router = express.Router()

router.post('/:studentId', createAttendance)
router.patch('/:studenId', updateAttendance)
// router.delete('/:assignmentId', deleteAssignment) will we need a delete attendance??

export default router
