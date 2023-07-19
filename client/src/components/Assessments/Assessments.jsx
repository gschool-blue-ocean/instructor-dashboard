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
				className="mx-auto bg-{#f1f5f9}"
				style={{ maxWidth: "600px", minWidth: "344px" }}
			>
					<h1 className="section-header">Assessment Summary :</h1>
					<div className="  mx-auto  bg-gray-300 drop-shadow-lg p-2">
						<h1 style={{ color: "DarkSlateBlue" }}>Assessment Results({assessments.length})</h1>
						<ul>
							{assessments.map((detail) => (
								<li key={detail.assessment_id}>
									<p>{detail.mcsp}</p>
									<p>{detail.assessment_name}</p>
									<p>{detail.percent}</p>
								</li>
							))}
						</ul>
				</div>
			</section>
		</div>
	);
}

export default AssessDetails;
