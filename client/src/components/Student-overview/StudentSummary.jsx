import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import ChangingProgressProvider from "./ChangingProgressProvider";

const StudentOverview = () => {
  const [studentName, setStudentName] = useState("studentName");
  const [cohort, setCohort] = useState("MCSP21- March 27, 2023");
  const [assignmentsCompletion, setAssignmentCompletion] = useState(71);
  const [projectCompletion, setProjectCompletion] = useState(84);
  const [assessmentResults, setAssessmentResults] = useState(94.5);
  const [detailDisplayStatus, setDetailDisplayStatus] = useState(
    <div className="border-t-4 border-black text-3xl p-5"></div>
  );

  function detailDisplay() {
    setDetailDisplayStatus(assignmentsCompletionDiv);
  }
  function detailDisplay2() {
    setDetailDisplayStatus(projectCompletionDiv)
    }

  var assignmentsCompletionDiv = (
    <div>
      <div className="border-t-4 border-black text-3xl p-5">
        Assignment Summary
      </div>
      <div className="border-4 border-black h-1/2 w-4/5 ml-2 rounded-3xl divide-y divide-y-4 divide-black divide-solid text-3xl pt-5 ml-5">
        Weekly Assignments(04)
        <div>
          01
          <button className="border-solid border-2 border-black ml-64 my-3 p-2">
            view
          </button>
        </div>
        <div>
          01
          <button className="border-solid border-2 border-black ml-64 my-3 p-2">
            view
          </button>
        </div>
        <div>
          01
          <button className="border-solid border-2 border-black ml-64 my-3 p-2">
            view
          </button>
        </div>
      </div>
    </div>
  );

  var projectCompletionDiv = (
    <div>
      <div className="border-t-4 border-black text-3xl p-5"></div>
      <div className="border-4 border-black h-1/2 w-4/5 ml-2 rounded-3xl divide-y divide-y-4 divide-black divide-solid text-3xl pt-5 ml-5">
        Project(10)
        <div>
          01
          <button className="border-solid border-2 border-black ml-64 my-3 p-2">
            Feedback
          </button>
        </div>
        <div>
          01
          <button className="border-solid border-2 border-black ml-64 my-3 p-2">
            Feedback
          </button>
        </div>
        <div>
          01
          <button className="border-solid border-2 border-black ml-64 my-3 p-2">
            Feedback
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section class="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg border-solid border-4 border-black	 h-screen m-4">
      <p className="text-right m-3 font-bold text-3xl">{cohort}</p>
      <p class="text-left ml-5 font-bold text-3xl">
        Welcome back, {studentName}
      </p>

      <p class="text-left ml-5 text-xl ">
        {" "}
        Track, manage and forecast your performance
      </p>
      <div class="flex place-content-center">
        <div
          class="rounded-3xl border-solid border-4 border-black	py-8 m-2 h-fit w-64"
          onClick={() => {
            detailDisplay();
          }}
        >
          <div class="text-center font-bold text-xl border-b-4 border-black">
            Assignments Completion{" "}
          </div>
          <div class="mt-5 mx-5 flex items-center">
          <AnimatedProgressProvider
        valueStart={0}
        valueEnd={100}
        duration={3}
        easingFunction={easeQuadInOut}
        repeat
        >
        
        {value => {
          const roundedValue = Math.round(value);
          return (
            <CircularProgressbar
              value={value}
              text={`${roundedValue}%`}
              /* This is important to include, because if you're fully managing the
        animation yourself, you'll want to disable the CSS animation. */
        styles={buildStyles({
          pathTransition: "stroke-dashoffset 0.5s ease-in-out",
          trailColor: "#dde2e9",
        })}
            />
          );
        }}
      </AnimatedProgressProvider>
          </div>
        </div>
        <div class="text-xl rounded-3xl border-solid border-4 border-black	py-8 m-2 h-fit w-64"
           onClick={() => {
            detailDisplay2();
          }}
        >
          <div class="text-center font-bold border-b-4 border-black">
            Project Completion
          </div>
          <div class="mt-5 mx-5 flex items-center">
            <CircularProgressbar
              value={projectCompletion}
              text={`${projectCompletion}%`}
            />
          </div>
        </div>
        <div class="text-xl rounded-3xl border-solid border-4 border-black	py-8 m-2 h-fit w-64">
          <div class="text-center font-bold border-b-4 border-black">
            Assessment Results
          </div>
          <div class="mt-5 mx-5 flex items-center">
            <CircularProgressbar
              value={assessmentResults}
              text={`${assessmentResults}%`}
            />
          </div>
        </div>
        <div class="text-center font-bold text-xl rounded-3xl border-solid border-4 border-black	py-8 m-2 h-fit w-64">
          Points Accured
          <div class="text-9xl text-center font-bold border-t-4 border-black h-[203px] pt-12">
            15
          </div>
          <div>Maximum Allowed: 50</div>
        </div>
      </div>
      {detailDisplayStatus}
      <div>
        <div class="border-solid border-4 border-black h-96 w-7/8 m-5 divide-solid divide-black">

        </div>
      </div>


    </section>
  );
};

export default StudentOverview;
