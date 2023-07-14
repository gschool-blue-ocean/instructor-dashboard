import React, { useEffect, useState } from "react";
import AssessDetails from "../Assessments/Assessments.jsx";
import ProjectDetails from "../Projects/Projects";
import AssignmentDetails from "../Assignment/Assignments";
import Feedback from "../Projects/Feedback";
import ProgressBar from "react-customizable-progressbar";

const StudentOverview = () => {
	const [studentName, setStudentName] = useState("studentName");
	const [cohort, setCohort] = useState("MCSP21- March 27, 2023");
	const [assignmentsCompletion, setAssignmentCompletion] = useState(71);
	const [projectCompletion, setProjectCompletion] = useState(84);
	const [assessmentResults, setAssessmentResults] = useState(94.5);

	const [detailDisplayStatus, setDetailDisplayStatus] = useState(<div></div>);

	function detailDisplay() {
		setDetailDisplayStatus(AssignmentDetails);
	}
	function detailDisplay2() {
		setDetailDisplayStatus(<ProjectDetails onclickFeedback={detailDisplay4} />);
	}
	function detailDisplay3() {
		setDetailDisplayStatus(AssessDetails);
	}
	function detailDisplay4() {
		setDetailDisplayStatus(<Feedback />);
	}

	return (
		<div class="">
			<p className="text-right m-3 font-bold text-3xl">{cohort}</p>
			<p class="text-left ml-5 font-bold text-3xl">
				Welcome back, {studentName}
			</p>

			<p class="text-left ml-5 text-xl text-gray-400 font-bold">
				{" "}
				Track, manage and forecast your performance
			</p>
			<div class="flex place-content-center ">
				<div
					class="text-xl rounded-3xl border-solid border-4 border-black	py-8 m-2 h-1/4 w-96"
					onClick={() => {
						detailDisplay();
					}}
				>
					<div class="text-center font-bold text-xl border-b-4 border-black">
						Assignments Completion{" "}
					</div>
					<div class="mt-5 mx-5 flex justify-center" onClick={detailDisplay}>
						<ProgressBar
							radius={100}
							progress={assignmentsCompletion}
							strokeWidth={15}
							strokeColor="#5d9cec"
							trackStrokeWidth={15}
							trackStrokeColor="#e6e6e6"
							trackStrokeLinecap="square"
							pointerRadius={0}
							initialAnimation={true}
							transition="1.5s ease 0.5s"
							trackTransition="0s ease"
						>
							<div className="flex justify-center items-center absolute top-0 w-full h-full mx-auto select-none text-3xl">
								<div>{assignmentsCompletion}%</div>
							</div>
						</ProgressBar>
					</div>
				</div>
				<div
					class="text-xl rounded-3xl border-solid border-4 border-black	py-8 m-2 h-1/4 w-96"
					onClick={() => {
						detailDisplay2();
					}}
				>
					<div class="text-center font-bold border-b-4 border-black">
						Project Completion
					</div>
					<div class="mt-5 mx-5 flex justify-center" onClick={detailDisplay}>
						<ProgressBar
							radius={100}
							progress={projectCompletion}
							strokeWidth={15}
							strokeColor="#5d9cec"
							trackStrokeWidth={15}
							trackStrokeColor="#e6e6e6"
							trackStrokeLinecap="square"
							pointerRadius={0}
							initialAnimation={true}
							transition="1.5s ease 0.5s"
							trackTransition="0s ease"
						>
							<div className="flex justify-center items-center absolute top-0 w-full h-full mx-auto select-none text-3xl">
								<div>{projectCompletion}%</div>
							</div>
						</ProgressBar>
					</div>
				</div>
				<div
					class="text-xl rounded-3xl border-solid border-4 border-black	py-8 m-2 h-1/4 w-96"
					onClick={() => {
						detailDisplay3();
					}}
				>
					<div class="text-center font-bold border-b-4 border-black">
						Assessment Results
					</div>
					<div class="mt-5 mx-5 flex justify-center" onClick={detailDisplay}>
						<ProgressBar
							radius={100}
							progress={assessmentResults}
							strokeWidth={15}
							strokeColor="#5d9cec"
							trackStrokeWidth={15}
							trackStrokeColor="#e6e6e6"
							trackStrokeLinecap="square"
							pointerRadius={0}
							initialAnimation={true}
							transition="1.5s ease 0.5s"
							trackTransition="0s ease"
						>
							<div className="flex justify-center items-center absolute top-0 w-full h-full mx-auto select-none text-3xl">
								<div>{assessmentResults}%</div>
							</div>
						</ProgressBar>
					</div>
				</div>
				<div class="text-xl rounded-3xl border-solid border-4 border-black	py-8 m-2 h-1/4 w-96">
					<div class="text-center font-bold border-b-4 border-black">
						Points Accured
					</div>

					<div class="mt-5 mx-5 flex justify-center" onClick={detailDisplay}>
						<ProgressBar
							radius={100}
							progress={83.5}
							strokeWidth={15}
							strokeColor="#5d9cec"
							trackStrokeWidth={15}
							trackStrokeColor="#e6e6e6"
							trackStrokeLinecap="square"
							pointerRadius={0}
							initialAnimation={true}
							transition="1.5s ease 0.5s"
							trackTransition="0s ease"
						>
							<div className="flex justify-center items-center absolute top-0 w-full h-full mx-auto select-none text-3xl">
								<div>{83.5}%</div>
							</div>
						</ProgressBar>
					</div>
				</div>
			</div>
			<div> {detailDisplayStatus}</div>
		</div>
	);
};

export default StudentOverview;
