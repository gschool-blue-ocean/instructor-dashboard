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
    setDetailDisplayStatus(projectCompletionDiv);
  }
  function detailDisplay3() {
    setDetailDisplayStatus(assessmentResultsDiv);
  }
  useEffect(() => {
    setDetailDisplayStatus(
      <div className="border-t-4 border-black text-3xl p-5"></div>
    ); // Call the detailDisplay function when the component mounts
  }, []);

  var assignmentsCompletionDiv = (
    <div>
      <div className="border-t-4 border-black text-3xl p-5">
        Assignment Summary
      </div>
      <div className="border-4 border-black h-1/2 w-4/5 ml-2 rounded-3xl divide-y divide-y-4 divide-black divide-solid text-3xl pt-5 ml-5">
        Weekly Assignments(04)
        <div class="line-through ...">
          ✅ Mini Module: What is an Operating System 
          <button className="rounded-lg border-solid border-2 border-black ml-64 my-3 p-2">
            view
          </button>
        </div>

        <div>
        <input type="checkbox" class=" ring-2 text-6xl m-5 w-6 h-6 text-center" />
        Mini Module: what is Docker
          <button className="rounded-lg border-solid border-2 border-black ml-64 my-3 p-2">
            
            view
          </button>
        </div>
        <div>
          03
          <button className="rounded-lg border-solid border-2 border-black ml-64 my-3 p-2">
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
          <button className="rounded-lg border-solid border-2 border-black ml-64 my-3 p-2">
            Feedback
          </button>
        </div>
        <div>
          02
          <button className="rounded-lg  border-solid border-2 border-black ml-64 my-3 p-2">
            Feedback
          </button>
        </div>
        <div>
          03
          <button className="rounded-lg border-solid border-2 border-black ml-64 my-3 p-2">
            Feedback
          </button>
        </div>
      </div>
    </div>
  );
  var assessmentResultsDiv = (
    <div>
      <div class="rounded-lg border-solid border-4 border-black h-96 w-7/8 m-5 divide-y divide-y-4 divide-black divide-solid ">
        <div className="text-center font-bold text-3xl">Assessment Results</div>
        <div class="grid grid-cols-3 divide-x-4 divide-black ">
          <div className="text-center font-bold p-5 text-3xl">Week </div>
          <div className="text-center font-bold p-5 text-3xl">Assessment</div>
          <div className="text-center font-bold p-5 text-3xl">Grade</div> 
        </div>

        <div class="grid grid-cols-3 divide-x-4 divide-black">
          <div className="text-center font-bold p-5 text-3xl">2</div>
          <div className="text-center font-bold p-5 text-3xl">DOM API Assessment</div>
          <div className="text-center font-bold p-5 text-3xl">95%</div>
        </div>

        <div class="grid grid-cols-3 divide-x-4 divide-black ">
          <div className="text-center font-bold p-5 text-3xl">6</div>
          <div className="text-center font-bold p-5 text-3xl">Server Side Assessment</div>
          <div className="text-center font-bold p-5 text-3xl">92%</div>
        </div>

        <div></div>
      </div>
    </div>
  );

  return (
    <section class="bg-gradient-to-r rounded-lg border-solid border-4 border-black	 h-screen m-4">
      <p className="text-right m-3 font-bold text-3xl">{cohort}</p>
      <p class="text-left ml-5 font-bold text-3xl">
        Welcome back, {studentName}
      </p>

      <p class="text-left ml-5 text-xl text-gray-400 font-bold">
        {" "}
        Track, manage and forecast your performance
      </p>
      <div class="flex place-content-center">
        <div
          class="text-xl rounded-3xl border-solid border-4 border-black	py-8 m-2 h-fit w-1/4"
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
          class="text-xl rounded-3xl border-solid border-4 border-black	py-8 m-2 h-fit w-1/4"
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
          class="text-xl rounded-3xl border-solid border-4 border-black	py-8 m-2 h-fit w-1/4"
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
        <div class="text-center font-bold text-xl rounded-3xl border-solid border-4 border-black	py-8 m-2 h-fit w-1/4">
          <div class="text-center font-bold border-b-4 border-black">
            Points Accured (Maximum Allowed: 50)
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
      {detailDisplayStatus}
    </section>
  );
};

export default StudentOverview;
