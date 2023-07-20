import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRole } from "../../context/authContext";

function Feedback({ onclickBack, studentInfo, projectId }) {
	const [projectFeedback, setProjectFeedback] = useState(null);
	const role = useRole();

	useEffect(() => {
		fetchFeedback();
	}, []);

	async function fetchFeedback() {
		try {
			const res = await axios.get(`/api/project/id/${projectId}`);
			if (res.data[0]) {
				console.log(res.data[0]);
				setProjectFeedback(res.data[0]);
				// Initialize feedbackData state with projectFeedback values
				setFeedbackData({
					design: res.data[0].design || 1,
					quality: res.data[0].quality || 1,
					projectFeedback: res.data[0].feedback || "",
					presentation_points: res.data[0].presentation_points || 1,
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	const [feedbackData, setFeedbackData] = useState({
		design: 0,
		quality: 0,
		feedback: "",
		presentation_points: 0,
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		const updatedValue =
			event.target.type === "number" ? parseInt(value, 10) : value;
		setFeedbackData((prevData) => ({
			...prevData,
			[name]: updatedValue,
		}));
	};

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			console.log(feedbackData);
			await axios.patch(`/api/project/${projectId}`, feedbackData);
			// Handle the response if needed

			// Do any additional logic or handling after the successful response
		} catch (error) {
			console.error("Error updating feedback:", error);
		}
	}

	console.log(projectFeedback);
	return (
		<section id="feedback" className="w-2/3 p-8 mx-auto">
			{projectFeedback && (
				<div className="p-10">
					<div className="information mb-3 flex-col">
						<p className="mb-4 font-bold">
							Project Name: {projectFeedback.project_name}
						</p>
						<form onSubmit={handleSubmit}>
							<p className="flex justify-between w-64 border-2 border-black rounded-md mb-2">
								<span>Design:</span>
								<select
									name="design"
									value={feedbackData.design}
									disabled={role === "instructor" ? false : true}
									onChange={handleChange}
									className="ml-auto"
								>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
							</p>

							<p className="flex justify-between w-64 border-2 border-black rounded-md mb-2">
								<span>Code Quality:</span>
								<select
									name="quality"
									value={feedbackData.quality}
									disabled={role === "instructor" ? false : true}
									onChange={handleChange}
									className="ml-auto"
								>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
							</p>

							<p className="flex justify-between w-64 border-2 border-black rounded-md mb-4">
								<span>Presentation Skills:</span>
								<select
									name="presentation_points"
									value={feedbackData.presentation_points}
									disabled={role === "instructor" ? false : true}
									onChange={handleChange}
									className="ml-auto"
								>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
							</p>
							<div className="comment flex flex-col">
								<p>Feedback:</p>
								<p>
									<textarea
										name="projectFeedback"
										value={feedbackData.projectFeedback}
										disabled={role === "instructor" ? false : true}
										onChange={handleChange}
									/>
								</p>
							</div>
							<div className="feedback_button">
								<button onClick={onclickBack}>Back to Projects</button>
								<button disabled={role === "instructor" ? false : true}>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</section>
	);
}

export default Feedback;
