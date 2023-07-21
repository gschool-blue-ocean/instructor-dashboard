import pg from "pg";
import {
  assessmentNames,
  projectNames,
  assignmentNames,
} from "./gradedWork.js";

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

function capitalizeName(param) {
  const result = param.charAt(0).toUpperCase() + param.slice(1).toLowerCase();
  return result;
}

export async function getStudents(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM student");
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
}
export async function getStudentsByMcsp(req, res, next) {
  try {
    const mcsp = req.params.mcsp.toUpperCase();
    const result = await db.query(
      "SELECT * FROM student WHERE mcsp = $1 ORDER by student_id",
      [mcsp]
    );
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
}
export async function getStudentInfo(req, res, next) {
  try {
    const email = req.params.email;
    const result = await db.query(
      "SELECT * FROM student WHERE email = $1 ORDER by student_id",
      [email]
    );
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
}
export async function getStudentById(req, res, next) {
  try {
    const studentId = req.params.studentId;
    const result = await db.query(
      "SELECT * FROM student WHERE student_id = $1",
      [studentId]
    );
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
}

export async function createStudent(req, res, next) {
  try {
    const userInputObj = req.body;
    const newStudentName = capitalizeName(userInputObj.first_name);
    const newStudentLastName = capitalizeName(userInputObj.last_name);
    const newStudentEmail = userInputObj.email;
    const newStudentMcsp = userInputObj.mcsp.toUpperCase();
    // newStudentMcsp.toUpperCase()

    const result = await db.query(
      "INSERT INTO student (first_name, last_name, email, mcsp) VALUES ($1, $2, $3, $4) RETURNING student_id",
      [newStudentName, newStudentLastName, newStudentEmail, newStudentMcsp]
    );

    const createdNewStudent = result.rows[0];
    const studentId = createdNewStudent.student_id;
    const studentMcsp = createdNewStudent.mcsp;
    // studentMcsp.toUpperCase()
    //creating a student will automatically make a attendance_points INSERT with the student_id
    await db.query(
      "INSERT INTO attendance_points (student_id, points, mcsp) VALUES ($1, 0, $2)",
      [studentId, studentMcsp]
    );
    await insertAssessments(studentId, studentMcsp);
    await insertProjects(studentId, studentMcsp);
    await insertAssignments(studentId, studentMcsp);

    res.status(201).send(result.rows[0]);
  } catch (error) {
    next(error);
  }
}
async function insertAssessments(studentId, studentMcsp) {
  assessmentNames;

  const insertPromises = assessmentNames.map(async (assessmentName) => {
    await db.query(
      "INSERT INTO assessment (student_id, assessment_name, percent, mcsp) VALUES ($1, $2, null, $3)",
      [studentId, assessmentName, studentMcsp]
    );
  });

  await Promise.all(insertPromises);
}
async function insertProjects(studentId, studentMcsp) {
  projectNames;

  const insertPromises = projectNames.map(async (projectName) => {
    await db.query(
      "INSERT INTO project (student_id, project_name, mcsp) VALUES ($1, $2, $3)",
      [studentId, projectName, studentMcsp]
    );
  });

  await Promise.all(insertPromises);
}
async function insertAssignments(studentId, studentMcsp) {
  assignmentNames;

  const insertPromises = assignmentNames.map(async (assignmentName) => {
    await db.query(
      "INSERT INTO assignment (student_id, assignment_name, mcsp) VALUES ($1, $2, $3)",
      [studentId, assignmentName, studentMcsp]
    );
  });

  await Promise.all(insertPromises);
}

export async function updateStudent(req, res, next) {
  try {
    const studentId = req.params.studentId;
    const userInputObj = req.body;
    const StudentName = capitalizeName(userInputObj.first_name);
    const StudentLastName = capitalizeName(userInputObj.last_name);
    const StudentEmail = userInputObj.email;
    const StudentMcsp = userInputObj.mcsp;

    const result = await db.query(
      "UPDATE student SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), email = COALESCE($3, email), mcsp = COALESCE($4, mcsp) WHERE student_id = $5 RETURNING *",
      [StudentName, StudentLastName, StudentEmail, StudentMcsp, studentId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const updatedStudent = result.rows[0];
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
}

export async function deleteStudent(req, res, next) {
  try {
    const studentId = req.params.studentId;

    const result = await db.query(
      "DELETE FROM student WHERE student_id = $1 RETURNING *",
      [studentId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const updatedStudent = result.rows[0];
    res.status(200).json("DELETED", updatedStudent);
  } catch (error) {
    next(error);
  }
}

export async function getStudentProject(req, res, next) {
  try {
    const studentId = req.params.studentId;
    const result = await db.query(
      "SELECT project.project_name, project.teacher_name, project.score, project.total, project.feedback, student.student_id, student.first_name, student.last_name FROM project INNER JOIN student ON project.student_id = student.student_id WHERE student.student_id = $1",
      [studentId]
    );
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
}

export async function getStudentOverview(req, res, next) {
  try {
    const studentId = req.params.studentId;
    const totalAssignments = assignmentNames.length;
    const totalProjects = projectNames.length;

    const getProjectTotal = `SELECT COUNT(*) AS project_total FROM project WHERE student_id = $1 AND completed = true`;

    const getAssessmentAverage = `SELECT AVG(percent) AS average_percentage FROM assessment WHERE student_id=$1`;

    const assignmentCountQuery = `
        SELECT COUNT(*) AS assignment_count
        FROM assignment
        WHERE completed = true AND student_id = $1
      `;

    const pointsQuery = `
        SELECT points
        FROM attendance_points
        WHERE student_id = $1
      `;

    const [
      averageAssessmentPercentResult,
      assignmentCountResult,
      pointsResult,
      projectTotalResult,
    ] = await Promise.all([
      db.query(getAssessmentAverage, [studentId]),
      db.query(assignmentCountQuery, [studentId]),
      db.query(pointsQuery, [studentId]),
      db.query(getProjectTotal, [studentId]),
    ]);

    const projectTotalNumber = projectTotalResult.rows[0].project_total;
    const assessmentAverage =
      averageAssessmentPercentResult.rows[0].average_percentage;
    const assignmentCount = assignmentCountResult.rows[0].assignment_count;
    const attendancePoints = pointsResult.rows[0].points;
    const studentOverview = {
      assessment_average: Number(Number(assessmentAverage).toFixed(2)),
      assignment_completion_percentage: Number(
        ((Number(assignmentCount) / totalAssignments) * 100).toFixed(2)
      ),
      attendance_points: attendancePoints,
      project_total: Number(
        ((Number(projectTotalNumber) / totalProjects) * 100).toFixed(2)
      ),
    };

    res.status(200).json(studentOverview);
  } catch (error) {
    next(error);
  }
}

export async function getStudentAssessment(req, res, next) {
  try {
    const studentId = req.params.studentId;
    const result = await db.query(
      "SELECT * FROM assessment WHERE student_id = $1",
      [studentId]
    );

    res.send(result.rows[0]);
  } catch (error) {
    next(error);
  }
}
