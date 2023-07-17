import pg from 'pg'

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL })

export async function getAssessment(req, res, next) {
    try {
        const result = await db.query('SELECT * FROM assessment')
        res.send(result.rows)
    } catch (error) {
        next(error)
    }
}
export async function getStudentAssessment(req, res, next) {
    try {
        const studentId = req.params.studentId
        const result = await db.query(
            'SELECT * FROM assessment WHERE student_id=$1',
            [studentId]
        )
        res.send(result.rows)
    } catch (error) {
        next(error)
    }
}

export async function updatedAssessment(req, res, next) {
    try {
        const assessmentId = req.params.assessmentId

        const result = await db.query(
            'UPDATE assessment SET percent = 100 WHERE assessment_id = $1 RETURNING *',
            [assessmentId]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Assessment not found' })
        }

        const updatedAssessment = result.rows[0]
        res.status(200).json(updatedAssessment)
    } catch (error) {
        next(error)
    }
}

export async function deleteAssessment(req, res, next) {
    try {
        const assessmentId = req.params.assessmentId

        const result = await db.query(
            'DELETE FROM assessment WHERE assessment_id = $1 RETURNING *',
            [assessmentId]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Assessment not found' })
        }

        const updatedAssessment = result.rows[0]
        res.status(200).json('DELETED', updatedAssessment)
    } catch (error) {
        next(error)
    }
}
