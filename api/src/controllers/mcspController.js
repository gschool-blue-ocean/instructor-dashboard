import pg from "pg";

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

export async function getMcsp(req, res, next) {
	try {
		const result = await db.query("SELECT * FROM mcsp");
		res.send(result.rows);
	} catch (error) {
		next(error);
	}
}
export async function getMcspOverview(req, res, next) {
	try {
		const mcspId = req.params.mcspId.toUpperCase();
		const totalAssignments = 40;
		const totalProjects = 21;

		const getStudentCount = `SELECT COUNT(*) AS studentcount FROM student WHERE mcsp=($1)`;
		const getAssignmentCount = `SELECT COUNT(*) AS assignmentcount FROM assignment WHERE mcsp=($1)`;
		const getCompletedProjectCount = `SELECT COUNT(*) AS projectcount FROM project where completed=true and mcsp=($1)`;
		const getAssessmentAverage = `SELECT AVG(percent) AS assessmentaverage FROM assessment where mcsp=($1)`;

		const [
			studentCountResult,
			assignmentCountResult,
			completedProjectCountResult,
			assessmentAverageResult,
		] = await Promise.all([
			db.query(getStudentCount, [mcspId]),
			db.query(getAssignmentCount, [mcspId]),
			db.query(getCompletedProjectCount, [mcspId]),
			db.query(getAssessmentAverage, [mcspId]),
		]);

		const studentCount = studentCountResult.rows[0].studentcount;
		const assignmentCount = assignmentCountResult.rows[0].assignmentcount;
		const projectCount = completedProjectCountResult.rows[0].projectcount;
		const assesmentAverage = assessmentAverageResult.rows[0].assessmentaverage;

		const cohortOverview = {
			assignment_percentage: Number(
				(assignmentCount / (studentCount * totalAssignments)) * 100
			).toFixed(1),
			assesmentAverage: Number(assesmentAverage).toFixed(1),
			project_percentage: Number(
				(projectCount / (studentCount * totalProjects)) * 100
			).toFixed(1),
		};

		res.status(201).send(cohortOverview);
	} catch (error) {
		next(error);
	}
}

export async function createMcsp(req, res, next) {
	try {
		const userInputObj = req.body;
		const newMcsp = userInputObj.mcsp;
		newMcsp.toUppercase();
		//this is NOT a forgein key, its VARCHAR(20) UNIQUE though.

		const result = await db.query(
			"INSERT INTO mcsp (mcsp) VALUES ($1) RETURNING *",
			[newMcsp]
		);

		const createdNewMcsp = result.rows[0];
		res.status(201).send(createdNewMcsp);
	} catch (error) {
		next(error);
	}
}
export async function updateMcsp(req, res, next) {
	try {
		const userInputObj = req.body;
		const mcspId = req.params.mcspId;
		const newMcsp = userInputObj.mcsp;
		newMcsp.toUppercase();
		//this is NOT a forgein key

		const result = await db.query(
			"UPDATE mcsp SET mcsp = COALESCE($1, mcsp) WHERE mcsp_id = $2 RETURNING *",
			[newMcsp, mcspId]
		);

		const updatedMcsp = result.rows[0];
		res.status(201).send(updatedMcsp);
	} catch (error) {
		next(error);
	}
}
export async function deleteMcsp(req, res, next) {
	try {
		const mcspId = req.params.mcspId;

		const result = await db.query(
			"DELETE FROM mcsp WHERE mcsp_id = $1 RETURNING *",
			[mcspId]
		);

		if (result.rowCount === 0) {
			return res.status(404).json({ error: "MCSP not found" });
		}

		const updatedMcsp = result.rows[0];
		res.status(200).json("DELETED", updatedMcsp);
	} catch (error) {
		next(error);
	}
}
