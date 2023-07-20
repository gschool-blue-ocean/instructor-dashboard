import React, { useState, useEffect } from "react";
import { useRole } from "../../context/authContext";
import axios from "axios";

function AssessDetails({ studentInfo, getOverview }) {
	const [assessments, setAssessments] = useState([]);
	const [assessmentData, setAssessmentData] = useState({});
	const role = useRole();

	useEffect(() => {
		async function fetchAssessment() {
			try {
				const res = await axios.get(
					`/api/assessment/${studentInfo.student_id}`
				);
				if (res.data.length > 0) {
					// Set the assessments data and initial assessmentData state
					const initialData = {};
					res.data.forEach((assessment) => {
						initialData[assessment.assessment_id] = assessment.percent;
					});

					setAssessments(res.data);
					setAssessmentData(initialData);
				}
			} catch (err) {
				console.log(err);
			}
		}

		fetchAssessment();
	}, [studentInfo.student_id]);

	const handleChange = (event) => {
		const { name, value, dataset } = event.target;
		const assignmentId = dataset.assignmentId;
		setAssessmentData((prevData) => ({
			...prevData,
			[assignmentId]: parseInt(value, 10),
		}));
	};

	const handleSubmit = async (event, assignmentId) => {
		event.preventDefault();
		// Use the assessmentData state to send the updated values to the server
		try {
			console.log(assignmentId);

			let data = {
				percent: assessmentData[assignmentId],
			};

			await axios.patch(`/api/assessment/${Number(assignmentId)}`, data);
			getOverview();
		} catch (error) {
			console.error("Error updating assessment:", error);
		}
	};

	return (
		<>
			{assessments && (
				<section
					className="mx-auto mt-8 min-h-screen bg-{#f1f5f9} "
					style={{ maxWidth: "600px", minWidth: "344px" }}
				>
					<h1 className="font-bold">Assessment Summary :</h1>
					<div className="mx-auto bg-{#f1f5f9} drop-shadow-lg p-6">
						<h1 className="font-bold"> Assessments ({assessments.length})</h1>
						<ul>
							{assessments.map((test) => (
								<li className="mb-6 border-b-2" key={test.assessment_id}>
									<p>{test.assessment_name}</p>
									<form
										onSubmit={(event) =>
											handleSubmit(event, test.assessment_id)
										}
									>
										<label htmlFor={`${test.assessment_id}`}></label>
										<div className="flex flex-col">
											<p>Score (0-100)</p>
											<input
												id={test.assessment_id}
												name={test.assessment_id}
												data-assignment-id={test.assessment_id}
												type="number"
												min={0}
												max={100}
												disabled={role === "instructor" ? false : true}
												className="border-2 rounded-md p-2 m-2"
												value={assessmentData[test.assessment_id] || ""}
												onChange={handleChange}
											/>
										</div>
										{role === "instructor" && (
											<button
												className="ml-3 bg-orange-200 hover:bg-orange-300"
												type="submit"
											>
												Submit
											</button>
										)}
									</form>
								</li>
							))}
						</ul>
					</div>
				</section>
			)}
		</>
	);
}

export default AssessDetails;
