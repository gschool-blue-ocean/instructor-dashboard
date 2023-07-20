import React, { useState, useEffect } from "react";
import axios from "axios";

function AssessDetails({ studentInfo }) {
	// console.log(studentInfo);
	const [assessments, setAssessments] = useState([]);

	useEffect(() => {
		async function fetchAssessment() {
			try {
				const res = await axios.get(
					`/api/assessment/${studentInfo.student_id}`
				);
				if (res.data.length > 0) {
					setAssessments(res.data);
				}
			} catch (err) {
				console.log(err);
			}
		}

		fetchAssessment();
	}, []);

	function handleClick(e) {
		let id = e.target.dataset.id;
		console.log("id", id);
	}

	return (
		<div>
			<section
				className="mx-auto mt-8 min-h-screen bg-{#f1f5f9}"
				style={{ maxWidth: "600px", minWidth: "344px" }}
			>
				<table>
					<caption>Assessment Results</caption>
					<thead>
						<tr>
							<th>MCSP</th>
							<th>Assessment</th>
							<th>Grade</th>
						</tr>
					</thead>
					<tbody>
						{assessments.map((detail) => (
							<tr key={detail.assessment_id}>
								<td>{detail.mcsp}</td>
								<td>{detail.assessment_name}</td>
								<td>{detail.percent}</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</div>
	);
}

export default AssessDetails;
