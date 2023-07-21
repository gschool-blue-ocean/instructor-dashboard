import React, { useEffect, useState } from "react";
import AssessDetails from "../Assessments/Assessments.jsx";
import ProjectDetails from "../Projects/Projects";
import AssignmentDetails from "../Assignment/Assignments";
import Feedback from "../Projects/Feedback";
import ProgressBar from "react-customizable-progressbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentOverview = ({ studentInfo, updateStudentInfo }) => {
	const params = useParams();
	const id = Number(params.studentId) || "";
	// console.log(studentInfo);
	const [studentName, setStudentName] = useState(
		studentInfo.first_name ? studentInfo.first_name : studentInfo
	);

	const [cohort, setCohort] = useState("MCSP21");
	const [assignmentsCompletion, setAssignmentCompletion] = useState(0);
	const [projectCompletion, setProjectCompletion] = useState(0);
	const [assessmentResults, setAssessmentResults] = useState(0);

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [detailDisplayStatus, setDetailDisplayStatus] = useState(<div></div>);
	// console.log("studentInfo:", studentInfo);

	const loadStudentIdIfNone = async (e) => {
		try {
			console.log(id, typeof id);

			//fetch and set student ID
			const res = await axios.get(`/api/student/id/${id}`);

			if (res.data[0]) {
				updateStudentInfo(res.data[0]);
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	function getOverview() {
		fetch(`/api/student/overview/${studentInfo.student_id}`)
			.then((response) => response.json())
			.then((data) => {
				const assessmentAverage = data.assessment_average;
				const assignmentCompletionPercentage =
					data.assignment_completion_percentage;
				const attendancePoints = data.attendance_points;
				const projectTotal = data.project_total;

				setAssignmentCompletion(assignmentCompletionPercentage);
				setAssessmentResults(assessmentAverage);
				setProjectCompletion(projectTotal);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	useEffect(() => {
		if (id) {
			console.log("getting student info...");
			loadStudentIdIfNone();
		}
	}, [id]);

	useEffect(() => {
		if (studentInfo.student_id) {
			getOverview();
		}
	}, [studentInfo]);

	function detailDisplay() {
		setDetailDisplayStatus(
			<AssignmentDetails
				onclickFeedback={detailDisplay}
				studentInfo={studentInfo}
				getOverview={getOverview}
			/>
		);
	}
	function detailDisplay2() {
		setDetailDisplayStatus(
			<ProjectDetails
				onclickFeedback={detailDisplay4}
				studentInfo={studentInfo}
				getOverview={getOverview}
			/>
		);
	}
	function detailDisplay3() {
		setDetailDisplayStatus(
			<AssessDetails studentInfo={studentInfo} getOverview={getOverview} />
		);
	}
	function detailDisplay4(projectId) {
		setDetailDisplayStatus(
			<Feedback
				onclickBack={detailDisplay2}
				studentInfo={studentInfo}
				projectId={projectId}
			/>
		);
	}

	function clearDetails() {
		setDetailDisplayStatus(<div></div>);
	}

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="border-t-2 border-slate-400  bg-[#02497f] ">
			<p className="text-right m-3 font-bold text-3xl text-gray-200">
				{cohort}
			</p>
			<p className="text-left ml-5 font-bold text-3xl text-gray-200">
				Student Overview for:{" "}
				{studentInfo.first_name + " " + studentInfo.last_name}
			</p>

			<p className="text-left ml-5 text-xl text-gray-400 font-bold mb-6">
				Track, manage and forecast your performance
			</p>

			<div className="flex justify-center pb-4">
				<div
					className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96 bg-[#db8844] cursor-pointer"
					onClick={() => {
						detailDisplay();
					}}
				>
					<div className="text-center font-bold text-xl border-b-4 border-black">
						Assignments Completion
					</div>
					<div
						className="mt-5 mx-5 flex justify-center"
						onClick={detailDisplay}
					>
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
					className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96 bg-[#db8844] cursor-pointer"
					onClick={() => {
						detailDisplay2();
					}}
				>
					<div className="text-center font-bold border-b-4 border-black">
						Project Completion
					</div>
					<div
						className="mt-5 mx-5 flex justify-center"
						onClick={detailDisplay}
					>
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
					className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96 bg-[#db8844] cursor-pointer"
					onClick={() => {
						detailDisplay3();
					}}
				>
					<div className="text-center font-bold border-b-4 border-black">
						Assessment Results
					</div>
					<div className="mt-5 mx-5 flex justify-center">
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

				<div className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96 bg-[#db8844]">
					<div className="text-center font-bold border-b-4 border-black">
						Points Accrued
					</div>
					<div className="mt-5 mx-5 flex justify-center" onClick={clearDetails}>
						<ProgressBar
							radius={100}
							progress={50}
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
							<div className="flex justify-center items-center absolute top-0 w-full h-full mx-auto select-none  text-3xl">
								<div>{25}</div>
							</div>
						</ProgressBar>
					</div>
				</div>
			</div>

			<div className="border-t-2 border-slate-400 bg-gray-200">
				{detailDisplayStatus}
			</div>
		</div>
	);
};

export default StudentOverview;
