import React, { useState, useEffect } from "react";
import Feedback from "./Feedback";
import axios from "axios";

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

	// console.log(projects);

	const handleCheckboxChange = async (event) => {
		try {
			// console.log(event.target.getAttribute("data-project-id"));
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
					className="mx-auto mt-8 bg-{#f1f5f9}"
					style={{ maxWidth: "600px", minWidth: "344px" }}
				>
					<h1 style={{ color: "Orange" }}>Project Summary :</h1>
					<div className="mx-auto  bg-gray-300 drop-shadow-lg p-2">
					<h1 style={{ color: "DarkBlue" }}>Class Projects({projects.length})</h1>
						<ul>
							{projects.map((project) => (
								<li key={project.project_id}>
									<form>
										<input
											data-project-id={project.project_id}
											type="checkbox"
											checked={project.completed}
											disabled={false}
											onChange={handleCheckboxChange}
										/>
									</form>
									<p>{project.Project || project.project_name} </p>
									<button
										data-id={project.ID}
										onClick={() => onclickFeedback()}
									>
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
