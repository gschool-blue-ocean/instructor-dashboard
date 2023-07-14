import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import AssessDetails from "../Assessments/Assessments.jsx";
import ProjectDetails from "../Projects/Projects";
import AssignmentDetails from "../Assignment/Assignments";

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
    setDetailDisplayStatus(ProjectDetails);
  }
  function detailDisplay3() {
    setDetailDisplayStatus(AssessDetails);
  }
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
          <div class="mt-5 mx-5 flex items-center">
            <AnimatedProgressProvider
              valueStart={1}
              valueEnd={assignmentsCompletion}
              duration={0.1}
              easingFunction={easeQuadInOut}
              once
            >
              {(value) => {
                const roundedValue = Math.round(value);
                return (
                  <CircularProgressbar
                    value={value}
                    text={`${roundedValue}%`}
                  />
                );
              }}
            </AnimatedProgressProvider>
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
          <div class="mt-5 mx-5 flex items-center">
            <AnimatedProgressProvider
              valueStart={1}
              valueEnd={projectCompletion}
              duration={0.1}
              easingFunction={easeQuadInOut}
              once
            >
              {(value) => {
                const roundedValue = Math.round(value);
                return (
                  <CircularProgressbar
                    value={value}
                    text={`${roundedValue}%`}
                  />
                );
              }}
            </AnimatedProgressProvider>
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
          <div class="mt-5 mx-5 flex items-center">
            <AnimatedProgressProvider
              valueStart={1}
              valueEnd={assessmentResults}
              duration={0.1}
              easingFunction={easeQuadInOut}
              once
            >
              {(value) => {
                const roundedValue = Math.round(value);
                return (
                  <CircularProgressbar
                    value={value}
                    text={`${roundedValue}%`}
                  />
                );
              }}
            </AnimatedProgressProvider>
          </div>
        </div>
        <div class="text-xl rounded-3xl border-solid border-4 border-black	py-8 m-2 h-1/4 w-96">
          <div class="text-center font-bold border-b-4 border-black">
            Points Accured
          </div>

          <div class="mt-5 mx-5 flex items-center">
            <AnimatedProgressProvider
              valueStart={1}
              valueEnd={25}
              duration={0.1}
              easingFunction={easeQuadInOut}
              once
            >
              {(value) => {
                const roundedValue = Math.round(value);
                return (
                  <CircularProgressbar
                    value={value * 2}
                    text={`${roundedValue}`}
                  />
                );
              }}
            </AnimatedProgressProvider>
          </div>
        </div>
      </div>
      <div> {detailDisplayStatus}</div>
    </div>
  );
};

export default StudentOverview;
