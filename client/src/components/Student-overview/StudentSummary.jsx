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
  const [isAssignmentDetailsVisible, setIsAssignmentDetailsVisible] =
    useState(false);
  const [detailDisplayStatus, setDetailDisplayStatus] = useState(<div></div>);

  function toggleDetailDisplay() {
    setIsAssignmentDetailsVisible(!isAssignmentDetailsVisible);
  }
  function detailDisplay() {
    setDetailDisplayStatus();
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
          className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96"
          onClick={() => {
            detailDisplay();
          }}
        >
          <div className="text-center font-bold text-xl border-b-4 border-black">
            Assignments Completion
          </div>
          <div
            className="mt-5 mx-5 flex justify-center"
            onClick={toggleDetailDisplay}
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
          className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96"
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
          className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96"
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

      <div>{isAssignmentDetailsVisible ? <AssignmentDetails /> : ""}</div>
    </div>
  );
};

export default StudentOverview;
