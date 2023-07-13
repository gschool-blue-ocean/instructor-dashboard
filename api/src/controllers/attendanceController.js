import pg from 'pg'

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL })

//this is to manually do this, a attendance_points insert is already made when a student is created

export async function createAttendance(req, res, next) {
    try {
        const studentId = req.params.studentId

        const result = await db.query(
            'INSERT INTO attedance_points (student_id, points) VALUES ($1, 0) RETURNING *',
            [studentId]
        )

        const createdNewAttendance = result.rows[0]
        res.status(201).send(createdNewAttendance)
    } catch (error) {
        next(error)
    }
}

//will only add points, need to change based on how the UI is wanted for this
export async function updateAttendance(req, res, next) {
    try {
        const studentId = req.params.studentId
        const pointsVariable = 5 //req.body.points

        const result = await db.query(
            'UPDATE attedance_points SET points= points + $1 WHERE student_id= $2 RETURNING *',
            [pointsVariable, studentId]
        )

        const updatedAttendancePoints = result.rows[0]
        res.status(201).send(updatedAttendancePoints)
    } catch (error) {
        next(error)
    }
}
