import React, { useState, useEffect } from "react";
import Feedback from "./Feedback";
import axios from "axios";

const projectDetails = Object.freeze([
	{ ID: 1, Project: "Browser Calculator", Status: "Complete" },
	{ ID: 2, Project: "Guessing Game", Status: "Complete" },
	{ ID: 3, Project: "FE Project", Status: "Complete" },
	{ ID: 4, Project: "Server-Side Assessment", Status: "Incomplete" },
	{ ID: 5, Project: "MVP", Status: "Complete" },
	{ ID: 6, Project: "React", Status: "Complete" },
	{ ID: 7, Project: "Front End Capstone", Status: "Complete" },
	{ ID: 8, Project: "Server-Side Capstone", Status: "Complete" },
	{ ID: 9, Project: "Blue Ocean", Status: "Incomplete" },
]);

function handleClick(e) {
	let id = e.target.dataset.id;
	console.log("id", id);
}

function ProjectDetails({ onclickFeedback }) {
	const [projects, setProjects] = useState(null);

	async function fetchProjects() {
		try {
			const res = await axios.get(`/api/project`);
			if (res.data.length > 0) {
				setProjects(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		fetchProjects();
	}, []);

	console.log(projects);

	const handleCheckboxChange = async (event) => {
		try {
			console.log(event.target.getAttribute("data-project-id"));
			const res = await axios.patch(
				`/api/project/completion/${Number(
					event.target.getAttribute("data-project-id")
				)}`
			);
			if (res.status === 200) {
				fetchProjects();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			{projects && (
				<section
					className="mx-auto mt-8 min-h-screen bg-{#f1f5f9}"
					style={{ maxWidth: "600px", minWidth: "344px" }}
				>
					<h1>Project Summary :</h1>
					<div className="mx-auto bg-white drop-shadow-lg">
						<h1>Class Projects({projectDetails.length})</h1>
						<ul>
							{projects.map((detail) => (
								<li key={detail.ID}>
									<form>
										<input
											data-project-id={detail.project_id}
											type="checkbox"
											checked={detail.completed}
											disabled={false}
											onChange={handleCheckboxChange}
										/>
									</form>
									<p>{detail.Project || detail.project_name} </p>
									<button data-id={detail.ID} onClick={() => onclickFeedback()}>
										Feedback
									</button>
								</li>
							))}
						</ul>
					</div>
				</section>
			)}
		</div>
	);
}

export default ProjectDetails;
