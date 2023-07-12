import pg from 'pg'

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL })

export async function getMcsp(req, res, next) {
    try {
        const result = await db.query('SELECT * FROM mcsp')
        res.send(result.rows)
    } catch (error) {
        next(error)
    }
}
export async function createMcsp(req, res, next) {
    try {
        const userInputObj = req.body
        const newMcsp = userInputObj.mcsp
        //this is NOT a forgein key

        const result = await db.query(
            'INSERT INTO mcsp (mcsp) VALUES ($1) RETURNING *',
            [newMcsp]
        )

        const createdNewStudent = result.rows[0]
        res.status(201).send(createdNewStudent)
    } catch (error) {
        next(error)
    }
}
export async function deleteMcsp(req, res, next) {
    try {
        const mcspId = req.params.mcspId

        const result = await db.query(
            'DELETE FROM mcsp WHERE mcsp_id = $1 RETURNING *',
            [mcspId]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'MCSP not found' })
        }

        const updatedMcsp = result.rows[0]
        res.status(200).json('DELETED', updatedMcsp)
    } catch (error) {
        next(error)
    }
}
