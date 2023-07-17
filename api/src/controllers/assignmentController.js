import pg from 'pg'

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL })

export async function getAssignment(req, res, next) {
    try {
        const result = await db.query(
            'SELECT * FROM assignment ORDER BY assignment_id'
        )
        res.send(result.rows)
    } catch (error) {
        next(error)
    }
}
export async function getStudentAssignment(req, res, next) {
    try {
        const studentId = req.params.studentId
        const result = await db.query(
            'SELECT * FROM assignment WHERE student_id=$1 ORDER BY assignment_id',
            [studentId]
        )
        res.send(result.rows)
    } catch (error) {
        next(error)
    }
}

export async function updatedAssignment(req, res, next) {
    try {
        const assignmentId = req.params.assignmentId

        const result = await db.query(
            'UPDATE assignment SET completed = NOT completed WHERE assignment_id = $1 RETURNING *',
            [assignmentId]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Assignment not found' })
        }

        const updatedAssignment = result.rows[0]
        res.status(200).json(updatedAssignment)
    } catch (error) {
        next(error)
    }
}

export async function deleteAssignment(req, res, next) {
    try {
        const assignmentId = req.params.assignmentId

        const result = await db.query(
            'DELETE FROM assignment WHERE assignment_id = $1 RETURNING *',
            [assignmentId]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Assignment not found' })
        }

        const updatedAssignment = result.rows[0]
        res.status(200).json('DELETED', updatedAssignment)
    } catch (error) {
        next(error)
    }
}
