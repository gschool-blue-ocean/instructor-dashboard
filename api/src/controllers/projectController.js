import pg from 'pg'

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL })

export async function getProject(req, res, next) {
    try {
        const result = await db.query(
            'SELECT * FROM project ORDER BY project_id'
        )
        res.send(result.rows)
    } catch (error) {
        next(error)
    }
}
export async function getStudentProject(req, res, next) {
    try {
        const studentId = req.params.studentId
        const result = await db.query(
            'SELECT * FROM project WHERE student_id = $1 ORDER BY project_id',
            [studentId]
        )
        res.send(result.rows)
    } catch (error) {
        next(error)
    }
}
export async function updateProject(req, res, next) {
    try {
        const projectId = req.params.projectId
        const projectFeedback = req.body.projectFeedback
        const presentation_points = req.body.presentation_points
        const design = req.body.design_points
        const quality = req.body.quality_points

        const result = await db.query(
            'UPDATE project SET feedback = $1, presentation_points = $2 design = $3, quality = $4 WHERE project_id = $5',
            [projectFeedback, presentation_points, design, quality, projectId]
        )
        const updatedProject = result.rows[0]
        res.status(200).json(updatedProject)
    } catch (error) {
        next(error)
    }
}
export async function updateProjectCompletion(req, res, next) {
    try {
        const projectId = req.params.projectId

        const result = await db.query(
            'UPDATE project SET completed = NOT completed WHERE project_id = $1 RETURNING *',
            [projectId]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'project not found' })
        }

        const updatedProject = result.rows[0]
        res.status(200).json(updatedProject)
    } catch (error) {
        next(error)
    }
}

export async function deleteProject(req, res, next) {
    try {
        const projectId = req.params.projectId

        const result = await db.query(
            'DELETE FROM project WHERE project_id = $1 RETURNING *',
            [projectId]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Project not found' })
        }

        const updatedProject = result.rows[0]
        res.status(200).json('DELETED', updatedProject)
    } catch (error) {
        next(error)
    }
}

export async function getProjectByProjectId(req, res, next) {
    try {
        const project_id = req.params.project_id
        const result = await db.query(
            'SELECT * FROM project WHERE project_id = $1 ',
            [project_id]
        )
        res.send(result.rows)
    } catch (error) {
        next(error)
    }
}
