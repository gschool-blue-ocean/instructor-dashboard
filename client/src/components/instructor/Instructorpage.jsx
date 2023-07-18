import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authContext";
import ProgressBar from "react-customizable-progressbar";
import StudentCard from "../StudentCard";

const Instructorpage = () => {
	const { user, logout } = UserAuth();
	const navigate = useNavigate();
	const [cohort, setCohort] = useState("mcsp-21");
	const [cohortOverview, setCohortOverview] = useState(null);

	async function fetchCohortOverview() {
		try {
			const res = await axios.get(`/api/mcsp/overview/${cohort}`);
			if (res.data.length > 0) {
				setCohort(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		fetchCohortOverview();
	}, []);
	console.log(co);
	return (
		<div>
			<div>
				<p className="text-right m-3 font-bold text-3xl">{cohort}</p>
				<p className="text-left ml-5 font-bold text-3xl">Welcome back,</p>

				<p className="text-left ml-5 text-xl text-gray-400 font-bold">
					Track, manage and forecast your performance
				</p>

				<div className="flex ">
					<div className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96 cursor-pointer">
						<div className="text-center font-bold text-xl border-b-4 border-black">
							Assignments Completion
						</div>
						<div className="mt-5 mx-5 flex justify-center">
							<ProgressBar
								radius={100}
								progress={cohortAssignments}
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
									<div>{cohortAssignments}%</div>
								</div>
							</ProgressBar>
						</div>
					</div>

					<div className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96 cursor-pointer">
						<div className="text-center font-bold border-b-4 border-black">
							Project Completion
						</div>
						<div className="mt-5 mx-5 flex justify-center">
							<ProgressBar
								radius={100}
								progress={cohortProjects}
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
									<div>{cohortProjects}%</div>
								</div>
							</ProgressBar>
						</div>
					</div>

					<div className="text-xl rounded-3xl border-solid border-4 border-black py-8 m-2 h-1/4 w-96 cursor-pointer">
						<div className="text-center font-bold border-b-4 border-black">
							Assessment Results
						</div>
						<div className="mt-5 mx-5 flex justify-center">
							<ProgressBar
								radius={100}
								progress={cohortAssessments}
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
									<div>{cohortAssessments}%</div>
								</div>
							</ProgressBar>
						</div>
					</div>
				</div>

				<StudentCard />
			</div>
		</div>
	);
};

export default Instructorpage;
