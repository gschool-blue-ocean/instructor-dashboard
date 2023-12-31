import React, { useState, useEffect } from "react";
import Feedback from "./Feedback";
import axios from "axios";
import { useRole } from "../../context/authContext";

function ProjectDetails({ onclickFeedback, studentInfo, getOverview }) {
	// console.log(studentInfo);
	const [projects, setProjects] = useState(null);
	const role = useRole();

	async function fetchProjects() {
		try {
			const res = await axios.get(`/api/project/${studentInfo.student_id}`);
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
				getOverview();
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
					<h1 className="font-bold">Project Summary :</h1>
					<div className="mx-auto bg-{#f1f5f9} drop-shadow-lg p-10">
						<h1 className="font-bold">Class Projects({projects.length})</h1>
						<ul>
							{projects.map((project) => (
								<li key={project.project_id}>
									<form>
										<input
											data-project-id={project.project_id}
											type="checkbox"
											checked={project.completed}
											disabled={role === "instructor" ? false : true}
											onChange={handleCheckboxChange}
											className="w-3 h-3 transform scale-150"
										/>
									</form>
									<p className={project.completed ? "line-through" : ""}>
										{project.project_name}{" "}
									</p>
									<button
										data-project-id={project.project_id}
										onClick={(e) =>
											onclickFeedback(e.target.getAttribute("data-project-id"))
										}
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
