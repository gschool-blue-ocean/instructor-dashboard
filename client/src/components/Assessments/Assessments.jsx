import React, { useState, useEffect } from "react";
import axios from "axios";

function AssessDetails() {
	const [assessments, setAssessments] = useState([]);

	useEffect(() => {
		async function fetchAssessment() {
			try {
				const res = await axios.get(`/api/assessment/${1}`);
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
				<table style={{ backgroundColor: "DarkSlateBlue" }}>
					<caption>Assessment Results</caption>
					<div className="mx-auto bg-gray-300 drop-shadow-lg">
					</div>
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
