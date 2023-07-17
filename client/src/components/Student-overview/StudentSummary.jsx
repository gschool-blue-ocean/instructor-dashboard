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
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [detailDisplayStatus, setDetailDisplayStatus] = useState(<div></div>);

useEffect(() => {
    fetch("http://localhost:3000/api/student/overview/1")
      .then((response) => response.json())
      .then((data) => {
        const assessmentAverage = data.assessment_average;
        const assignmentCompletionPercentage =
          data.assignment_completion_percentage;
        const attendancePoints = data.attendance_points;
        const projectTotal = data.project_total;

        console.log(assessmentAverage);
        console.log(assignmentCompletionPercentage);
        console.log(attendancePoints);
        console.log(projectTotal);
        setAssignmentCompletion(assignmentCompletionPercentage);
        setAssessmentResults(assessmentAverage);
        setProjectCompletion(projectTotal);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

useEffect(() => {
    fetch("http://localhost:3000/api/student")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].first_name)
        const firstName = data[0].first_name;
        const lastName = data[0].last_name;
        const fullName = firstName + " " + lastName;
        console.log("first name",firstName);
        console.log(lastName);
        setStudentName(fullName);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

function detailDisplay() {
		setDetailDisplayStatus(
			<AssignmentDetails onclickFeedback={detailDisplay} />
		);
	}
function detailDisplay2() {
		setDetailDisplayStatus(<ProjectDetails onclickFeedback={detailDisplay4} />);
	}
function detailDisplay3() {
		setDetailDisplayStatus(AssessDetails);
	}
function detailDisplay4() {
		setDetailDisplayStatus(<Feedback onclickBack={detailDisplay2} />);
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
		<div>
			<p className="text-right m-3 font-bold text-3xl">{cohort}</p>
			<p className="text-left ml-5 font-bold text-3xl">
				Welcome back, {studentName}
			</p>

			<p className="text-left ml-5 text-xl text-gray-400 font-bold">
				Track, manage and forecast your performance
			</p>

			<div className="flex place-content-center">
				<div
					className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96 cursor-pointer"
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
					className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96 cursor-pointer"
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
					className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96 cursor-pointer"
					onClick={() => {
						detailDisplay3();
					}}
				>
					<div className="text-center font-bold border-b-4 border-black">
						Assessment Results
					</div>
					<div
						className="mt-5 mx-5 flex justify-center"
						onClick={detailDisplay}
					>
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

				<div className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96">
					<div className="text-center font-bold border-b-4 border-black">
						Points Accrued
					</div>
					<div
						className="mt-5 mx-5 flex justify-center"
						onClick={detailDisplay}
					>
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
							<div className="flex justify-center items-center absolute top-0 w-full h-full mx-auto select-none text-3xl">
								<div>{25}</div>
							</div>
						</ProgressBar>
					</div>
				</div>
			</div>

			<div>{detailDisplayStatus}</div>
		</div>
	);
};

export default StudentOverview;
