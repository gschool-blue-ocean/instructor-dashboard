import pg from "pg";

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

function capitalizeName(param) {
  const result = param.charAt(0).toUpperCase() + param.slice(1).toLowerCase();
  return result;
}

export async function getTeacher(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM teacher");
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
}

export async function createTeacher(req, res, next) {
  try {
    const userInputObj = req.body;
    const newTeacherName = capitalizeName(userInputObj.first_name);
    const newTeacherLastName = capitalizeName(userInputObj.last_name);
    const newTeacherEmail = userInputObj.email;

    const result = await db.query(
      "INSERT INTO teacher (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *",
      [newTeacherName, newTeacherLastName, newTeacherEmail]
    );

    const createdNewTeacher = result.rows[0];
    res.status(201).send(createdNewTeacher);
  } catch (error) {
    next(error);
  }
}

export async function updateTeacher(req, res, next) {
  try {
    const teacherId = req.params.teacherId;
    const userInputObj = req.body;
    const teacherName = capitalizeName(userInputObj.first_name);
    const teacherLastName = capitalizeName(userInputObj.last_name);
    const teacherEmail = userInputObj.email;
    c;

    const result = await db.query(
      "UPDATE teacher SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), email = COALESCE($3, email), mcsp = COALESCE($4, mcsp) WHERE teacher_id = $5 RETURNING *",
      [teacherName, teacherLastName, teacherEmail, teacherId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const updatedTeacher = result.rows[0];
    res.status(200).json(updatedTeacher);
  } catch (error) {
    next(error);
  }
}

export async function deleteTeacher(req, res, next) {
  try {
    const teacherId = req.params.teacherId;

    const result = await db.query(
      "DELETE FROM teacher WHERE teacher_id = $1 RETURNING *",
      [teacherId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "teacher not found" });
    }

    const updatedTeacher = result.rows[0];
    res.status(200).json("DELETED", updatedTeacher);
  } catch (error) {
    next(error);
  }
}

export async function getMcspOverview(req, res, next) {
  try {
    const mcsp = req.params.mcsp;
    mcsp.toUpperCase();
    const totalAssignments = 40;
    const totalProjects = 21;
    const getProjectTotal = `SELECT COUNT(*) AS project_total FROM project WHERE mcsp = $1`;
    const getAssessmentAverage = `SELECT AVG(percent) AS average_percentage FROM assessment WHERE mcsp=$1`;

    const assignmentCountQuery = `
        SELECT COUNT(*) AS assignment_count
        FROM assignment
        WHERE completed = true AND mcsp = $1
      `;
    const pointsQuery = `
        SELECT AVG(points) AS average_attendance_points
        FROM attendance_points
        WHERE mcsp = $1
      `;
    const [
      averageAssessmentPercentResult,
      assignmentCountResult,
      average_attendance_points,
      projectTotalResult,
    ] = await Promise.all([
      db.query(getAssessmentAverage, [mcsp]),
      db.query(assignmentCountQuery, [mcsp]),
      db.query(pointsQuery, [mcsp]),
      db.query(getProjectTotal, [mcsp]),
    ]);
    const projectTotalNumber = projectTotalResult.rows[0].project_total;
    const assessmentAverage =
      averageAssessmentPercentResult.rows[0].average_percentage;
    const assignmentCount = assignmentCountResult.rows[0].assignment_count;
    const attendancePoints =
      average_attendance_points.rows[0].average_attendance_points;
    // console.log(pointsResult)
    const mcspOverview = {
      assessment_average: Number(Number(assessmentAverage).toFixed(2)),
      assignment_completion_percentage: Number(
        ((Number(assignmentCount) / totalAssignments) * 100).toFixed(2)
      ),
      average_attendance_points: Number(Number(attendancePoints).toFixed(2)),
      project_total: Number(
        ((Number(projectTotalNumber) / totalProjects) * 100).toFixed(2)
      ),
    };

    res.status(200).json(mcspOverview);
  } catch (error) {
    next(error);
  }
}
