import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRole } from "../../context/authContext";

function handleClick(e) {
	let id = e.target.dataset.id;
	console.log("id", id);
}

function AssignmentDetails({ onclickFeedback, studentInfo, getOverview }) {
	const [assignments, setAssignments] = useState(null);
	const role = useRole();

	useEffect(() => {
		fetchAssignments();
	}, []);
	async function fetchAssignments() {
		try {
			const res = await axios.get(
				`/api/assignment/student/${studentInfo.student_id}`
			);

			if (res.data.length > 0) {
				setAssignments(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	}
	// console.log(assignments);

	const handleCheckboxChange = async (event) => {
		try {
			// console.log(event.target.getAttribute("data-assignment-id"));

			const res = await axios.patch(
				`/api/assignment/completion/${Number(
					event.target.getAttribute("data-assignment-id")
				)}`
			);
			if (res.status === 200) {
				fetchAssignments();
				getOverview();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{assignments && (
				<section
					className="mx-auto mt-8 min-h-screen bg-{#f1f5f9} "
					style={{ maxWidth: "600px", minWidth: "344px" }}
				>
					<h1 className="font-bold">Assignment Summary :</h1>
					<div className="mx-auto drop-shadow-lg p-10">
						<h1 className="font-bold">
							Week Assignment ({assignments.length})
						</h1>
						<ul>
							{assignments.map((detail) => (
								<li key={detail.assignment_id}>
									<input
										data-assignment-id={detail.assignment_id}
										type="checkbox"
										checked={detail.completed}
										disabled={role === "instructor" ? false : true}
										onChange={handleCheckboxChange}
										className="w-3 h-3 transform scale-150"
									/>
									<p className={detail.completed ? "line-through" : ""}>
										{detail.assignment_name}
									</p>
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
