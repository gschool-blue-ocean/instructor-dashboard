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
			const res = await axios.get(`/api/project/id/${projectId}`);
			if (res.data.length > 0) {
				console.log(res.data);
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
		
		<section id="feedback" className="mx-auto bg-{#f1f5f9}" >
		
		{projectFeedback && (
			<>
				<h1 className="section-header">Project Feedback :</h1>
				<div className="mx-auto p-2 bg-gray-300 drop-shadow-lg">
				<div className="information mb-3">
						<p classname="label">Project Name: {projectFeedback.project_name}</p>
						<p className="score">
						<span className="label">Design:</span>
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

						<p className="score">
						<span className="label">Code Quality:</span>
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

						<p className="score">
						<span className="label">Presentation Skills:</span>
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
					<p><span className="label">Feedback:</span></p>
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
			</>
			)}

		</section>
	);
}
export default Feedback;
