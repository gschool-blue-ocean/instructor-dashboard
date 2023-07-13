import express from 'express'
import studentRouter from './routes/studentRoutes.js'
import teacherRouter from './routes/teacherRoutes.js'
import mcspRouter from './routes/mcspRouter.js'
import projectRouter from './routes/projectRouter.js'
import assignmentRouter from './routes/assignmentRouter.js'
import attendanceRouter from './routes/attendanceRouter.js'

const app = express()
app.use(express.json())

app.use('/api/student', studentRouter)
app.use('/api/teacher', teacherRouter)
app.use('/api/mcsp', mcspRouter)
app.use('/api/project', projectRouter)
app.use('/api/assignment', assignmentRouter)
app.use('/api/attendance', attendanceRouter)
export default app
