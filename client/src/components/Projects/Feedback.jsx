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
    }   
    
    const [presentation, setPresentation] = useState(project.Presentation_skills);
    const handlePresentationChange = (events) => {
        setPresentation(event.target.value);  
    }  

    return (
        <section id="feedback">
            <div>
                <div className="information">
                    <p>Project Name: {project.Project}</p>
                    <p>
                        Design: 
                        <select value={design} onChange={handleDesignChange} disabled ={project.Input_disabled}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </p>
                         
                    <p>
                        Code Quality: 
                        <select value={quality} onChange={handleQualityChange} disabled ={project.Input_disabled}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </p>

                    <p>
                        Presentation Skills: 
                        <select value={presentation} onChange={handlePresentationChange} disabled ={project.Input_disabled}>
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
                        <textarea value={feedback} onChange={handleFeedbackChange} disabled ={project.Input_disabled}></textarea>
                    </p>
                </div>
                <div className="feedback_button">
                    <Link to="/student_projects">Back to Projects</Link>
                    <button disabled ={project.Input_disabled}>Submit</button>
                </div>
            </div>
        </section>
    );
}
export default Feedback;
