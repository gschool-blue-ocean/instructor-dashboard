import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authContext";
import ProgressBar from "react-customizable-progressbar";
import StudentCard from "../StudentCard";
import axios from "axios";
import Filter from "../Filter/Filter";

const Instructorpage = () => {
	const navigate = useNavigate();
	const [cohort, setCohort] = useState("MCSP-21");
	const [cohortOverview, setCohortOverview] = useState(null);
	const [cohortStudents, setCohortStudents] = useState(null);
   
function onCohortSelection (cohort) {
	setCohort(cohort);
	console.log(cohort)
	
}

console.log(cohort)

	async function fetchCohortOverview() {
		try {
			const res = await axios.get(`/api/mcsp/overview/${cohort}`);
			if (res.data) {
				setCohortOverview(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	}

	async function fetchCohortStudents() {
		try {
			const res = await axios.get(`/api/student/mcsp/${cohort}`);
			console.log(res.data);
			if (res.data) {
				setCohortStudents(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		fetchCohortOverview();
		fetchCohortStudents();
	}, [cohort]);
	console.log(cohortStudents);

	return (
		<div className="border-t-2 border-slate-400">
			{cohortOverview && (
				<div>
					<p className="text-right mt-3 mr-3 font-bold text-3xl">{cohort}</p>
					<p className="text-left ml-5 font-bold text-3xl">
						Welcome back, Instructor
					</p>

					<p className="text-left ml-5 text-xl text-gray-400 font-bold">
						Track, manage and forecast cohort performance
					</p>
                    <Filter onCohortSelection={onCohortSelection}/>
					<div className="flex ">
						<div className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96">
							<div className="text-center font-bold text-xl border-b-4 border-black">
								Assignments Completion
							</div>
							<div className="mt-5 mx-5 flex justify-center">
								<ProgressBar
									radius={100}
									progress={cohortOverview.assignment_percentage}
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
										<div>{cohortOverview.assignment_percentage}%</div>
									</div>
								</ProgressBar>
							</div>
						</div>

						<div className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96 ">
							<div className="text-center font-bold border-b-4 border-black">
								Project Completion
							</div>
							<div className="mt-5 mx-5 flex justify-center">
								<ProgressBar
									radius={100}
									progress={cohortOverview.project_percentage}
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
										<div>{cohortOverview.project_percentage}%</div>
									</div>
								</ProgressBar>
							</div>
						</div>

						<div className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96 ">
							<div className="text-center font-bold border-b-4 border-black">
								Assessment Results
							</div>
							<div className="mt-5 mx-5 flex justify-center">
								<ProgressBar
									radius={100}
									progress={cohortOverview.assesmentAverage}
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
										<div>{cohortOverview.assesmentAverage}%</div>
									</div>
								</ProgressBar>
							</div>
						</div>
					</div>
                    <div className="border-t-2 border-slate-400"></div>
					{cohortStudents && (
						<div className="flex flex-wrap mx-3 mt-4  ">
							{cohortStudents.map((student) => {
								return <StudentCard student={student} />;
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Instructorpage;
