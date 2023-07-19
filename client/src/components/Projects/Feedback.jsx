import React, { useState } from "react";
import { Link } from "react-router-dom";

function Feedback({ onclickBack }) {
	const project = {
		Project: "Project Name",
		Design: 4,
		Code_quality: 3,
		Feedback: "Feedback Text",
		Input_disabled: true,
		Presentation_skills: 5,
	};

	const [design, setDesign] = useState(project.Design);
	const handleDesignChange = (events) => {
		setDesign(event.target.value);
	};

	const [quality, setQuality] = useState(project.Code_quality);
	const handleQualityChange = (events) => {
		setQuality(event.target.value);
	};

	const [feedback, setFeedback] = useState(project.Feedback);
	const handleFeedbackChange = (events) => {
		setFeedback(event.target.value);
	};

	const [presentation, setPresentation] = useState(project.Presentation_skills);
	const handlePresentationChange = (events) => {
		setPresentation(event.target.value);
	};

	return (
		<section id="feedback" 
			className="mx-auto bg-{#f1f5f9}" >

			<h1 className="section-header">Project Feedback :</h1>
			<div className="mx-auto p-2 bg-gray-300 drop-shadow-lg">
				<div className="information mb-3">
					<p><span className="label">Project Name:</span> {project.Project}</p>

					<p className="score">
						<span className="label">Design:</span>
						<select
							value={design}
							onChange={handleDesignChange}
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
						<span className="label">Code Quality:</span>
						<select
							value={quality}
							onChange={handleQualityChange}
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
							value={presentation}
							onChange={handlePresentationChange}
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
							value={feedback}
							onChange={handleFeedbackChange}
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
		</section>
	);
}
export default Feedback;
