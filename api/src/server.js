import express from 'express'
import studentRouter from './routes/studentRoutes.js'
import teacherRouter from './routes/teacherRoutes.js'
import mcspRouter from './routes/mcspRouter.js'
import projectRouter from './routes/projectRouter.js'

const app = express()
app.use(express.json())

app.use('/api/student', studentRouter)
app.use('/api/teacher', teacherRouter)
app.use('/api/mcsp', mcspRouter)
app.use('/api/project', projectRouter)
export default app
