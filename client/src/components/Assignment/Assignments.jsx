import React, { useState, useEffect } from "react";
import axios from "axios";

function handleClick(e) {
	let id = e.target.dataset.id;
	console.log("id", id);
}

function AssignmentDetails({ onclickFeedback }) {
	const [assignments, setAssignments] = useState(null);
	useEffect(() => {
		fetchAssignments();
	}, []);
	async function fetchAssignments() {
		try {
			const res = await axios.get(`/api/assignment`);
			if (res.data.length > 0) {
				setAssignments(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	}
	console.log(assignments);

	const handleCheckboxChange = async (event) => {
		try {
			console.log(event.target.getAttribute("data-assignment-id"));

			const res = await axios.patch(
				`/api/assignment/completion/${Number(
					event.target.getAttribute("data-assignment-id")
				)}`
			);
			if (res.status === 200) {
				fetchAssignments();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{assignments && (
				<section
					className="mx-auto bg-{#f1f5f9}"
					style={{ maxWidth: "600px", minWidth: "344px" }}
				>
					<h1 className="section-header">Assignment Summary :</h1>
					<div className="mx-auto p-2 bg-gray-200 drop-shadow-lg">
						<h1 style={{ color: "DarkSlateBlue" }}>Week Assignment ({assignments.length})</h1>
						<ul>
							{assignments.map((detail) => (
								<li key={detail.ID}>
									<div className="checkbox-and-label">
										<input  key={detail.ID}
											data-assignment-id={detail.assignment_id}
											type="checkbox"
											checked={detail.completed}
											disabled={false}
											onChange={handleCheckboxChange}
										/>
										<p className={detail.completed ? "line-through" : ""}>
											{detail.assignment_name}
										</p>
									</div>
									<button data-id={detail.ID} onClick={() => onclickFeedback()}>
									View
									</button>
								</li>
							))}
						</ul>
					</div>
				</section>
			)}
		</>
	);
}

export default AssignmentDetails;
