import pg from 'pg'

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL })

function capitalizeName(param) {
    const result = param.charAt(0).toUpperCase() + param.slice(1).toLowerCase()
    return result
}

export async function getStudents(req, res, next) {
    try {
        const result = await db.query('SELECT * FROM student')
        res.send(result.rows)
    } catch (error) {
        next(error)
    }
}

export async function createStudent(req, res, next) {
    try {
        const userInputObj = req.body
        const newStudentName = capitalizeName(userInputObj.first_name)
        const newStudentLastName = capitalizeName(userInputObj.last_name)
        const newStudentEmail = userInputObj.email
        const newStudentMcsp = userInputObj.mcsp

        const result = await db.query(
            'INSERT INTO student (first_name, last_name, email, mcsp) VALUES ($1, $2, $3, $4) RETURNING *',
            [
                newStudentName,
                newStudentLastName,
                newStudentEmail,
                newStudentMcsp,
            ]
        )

        const createdNewStudent = result.rows[0]
        res.status(201).send(createdNewStudent)
    } catch (error) {
        next(error)
    }
}

export async function updateStudent(req, res, next) {
    try {
        const studentId = req.params.studentId
        const userInputObj = req.body
        const StudentName = capitalizeName(userInputObj.first_name)
        const StudentLastName = capitalizeName(userInputObj.last_name)
        const StudentEmail = userInputObj.email
        const StudentMcsp = userInputObj.mcsp

        const result = await db.query(
            'UPDATE student SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), email = COALESCE($3, email), mcsp = COALESCE($4, mcsp) WHERE student_id = $5 RETURNING *',
            [StudentName, StudentLastName, StudentEmail, StudentMcsp, studentId]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Student not found' })
        }

        const updatedStudent = result.rows[0]
        res.status(200).json(updatedStudent)
    } catch (error) {
        next(error)
    }
}

export async function deleteStudent(req, res, next) {
    try {
        const studentId = req.params.studentId

        const result = await db.query(
            'DELETE FROM student WHERE student_id = $1 RETURNING *',
            [studentId]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Student not found' })
        }

        const updatedStudent = result.rows[0]
        res.status(200).json('DELETED', updatedStudent)
    } catch (error) {
        next(error)
    }
}

export async function getStudentProject(req, res, next) {
    try {
        const studentId = req.params.studentId
        const result = await db.query(
            'SELECT project.project_name, project.teacher_name, project.score, project.total, project.feedback, student.student_id, student.first_name, student.last_name FROM project INNER JOIN student ON project.student_id = student.student_id WHERE student.student_id = $1',
            [studentId]
        )
        res.send(result.rows)
    } catch (error) {
        next(error)
    }
}

export async function getStudentOverview(req, res, next) {
    try {
        const studentId = req.params.studentId

        const assignmentCountQuery = `
        SELECT COUNT(*) AS assignment_count
        FROM assignment
        WHERE completed = true AND student_id = $1
      `

        const pointsQuery = `
        SELECT points
        FROM attendance_points
        WHERE student_id = $1
      `

        const [assignmentCountResult, pointsResult] = await Promise.all([
            db.query(assignmentCountQuery, [studentId]),
            db.query(pointsQuery, [studentId]),
        ])

        const assignmentCount = assignmentCountResult.rows[0].assignment_count
        const attendancePoints = pointsResult.rows[0].points

        const studentOverview = {
            assignment_count: assignmentCount,
            attendance_points: attendancePoints,
        }

        res.status(200).json(studentOverview)
    } catch (error) {
        next(error)
    }
}
