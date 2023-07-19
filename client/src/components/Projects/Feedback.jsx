import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Feedback({ onclickBack, studentInfo, projectId }) {
	const [projectFeedback, setProjectFeedback] = useState(null);

	useEffect(() => {
		fetchFeedback();
	}, []);

	async function fetchFeedback() {
		try {
			//TODO:
			//this API endpoint actually queries the studentID
			//update endpoint path when endpoint exists
			const res = await axios.get(`/api/project/${projectId}`);
			if (res.data.length > 0) {
				//once the above API is created, update below to res.data
				setProjectFeedback(res.data[0]);
			}
		} catch (err) {
			console.log(err);
		}
	}

	const project = {
		Project: "Project Name",
		Design: 4,
		Code_quality: 3,
		Feedback: "Feedback Text",
		Input_disabled: true,
		Presentation_skills: 5,
	};

	//TODO: Add onChange functions that will update projectFeedback

	// const [design, setDesign] = useState(project.Design);
	// const handleDesignChange = (event) => {
	// 	setDesign(event.target.value);
	// };

	// const [quality, setQuality] = useState(project.Code_quality);
	// const handleQualityChange = (event) => {
	// 	setQuality(event.target.value);
	// };

	// const [feedback, setFeedback] = useState(project.Feedback);
	// const handleFeedbackChange = (event) => {
	// 	setFeedback(event.target.value);
	// };

	// const [presentation, setPresentation] = useState(project.Presentation_skills);
	// const handlePresentationChange = (event) => {
	// 	setPresentation(event.target.value);
	// };

	return (
		<section id="feedback" className="p-8">
			{projectFeedback && (
				<div className="p-10">
					<div className="information mb-3">
						<p>Project Name: {projectFeedback.project_name}</p>
						<p>
							Design:
							<select
								value={projectFeedback.design}
								disabled={studentInfo === "Instructor" ? false : true}
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</p>

						<p>
							Code Quality:
							<select
								value={projectFeedback.quality}
								disabled={project.Input_disabled}
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</p>

						<p>
							Presentation Skills:
							<select
								value={projectFeedback.presentation_points}
								disabled={project.Input_disabled}
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</p>
					</div>
					<div className="comment">
						<p>Feedback:</p>
						<p>
							<textarea
								value={projectFeedback.feedback}
								disabled={project.Input_disabled}
							></textarea>
						</p>
					</div>
					<div className="feedback_button">
						<button
							onClick={() => {
								onclickBack();
							}}
						>
							Back to Projects
						</button>
						<button disabled={project.Input_disabled}>Submit</button>
					</div>
				</div>
			)}
		</section>
	);
}
export default Feedback;
