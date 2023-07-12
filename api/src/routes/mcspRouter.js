import express from 'express'
import {
    getMcsp,
    createMcsp,
    deleteMcsp,
} from '../controllers/mcspController.js'

const router = express.Router()

router.get('/', getMcsp)
router.post('/', createMcsp)
router.delete('/:mcspId', deleteMcsp)

export default router
