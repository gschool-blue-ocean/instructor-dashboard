import React from "react";
import ProjectDetails from "./Projects/Projects";


const StudentCard = () => {
	//eventually will receive cohort data and will conditionally render the name and color of the card based on their individual performance

	return (
		<div className="flex flex-wrap">
			<div className="flex flex-col justify-between border rounded-lg h-28 w-32 mx-2 shadow-md hover:scale-105 transition duration-200 ease-in-out cursor-pointer">
				<p className="text-sm text-center pt-2">John Kluse</p>
				<p className="h-4 bg-yellow-300 rounded-b"></p>
			</div>
			<div className="flex flex-col justify-between border rounded-lg h-28 w-32 mx-2 shadow-md hover:scale-105 transition duration-200 ease-in-out cursor-pointer">
				<p className="text-sm text-center pt-2">Tim Galloway</p>
				<p className="h-4 bg-green-500 rounded-b"></p>
			</div>
			<div className="flex flex-col justify-between border rounded-lg h-28 w-32 mx-2 shadow-md hover:scale-105 transition duration-200 ease-in-out cursor-pointer">
				<p className="text-sm text-center pt-2">Dalton Andrews</p>
				<p className="h-4 bg-green-500 rounded-b"></p>
			</div>
			<div className="flex flex-col justify-between border rounded-lg h-28 w-32 mx-2 shadow-md hover:scale-105 transition duration-200 ease-in-out cursor-pointer">
				<p className="text-sm text-center pt-2">Joseph Carmeli</p>
				<p className="h-4 bg-red-500 rounded-b"></p>
			</div>
			<div className="flex flex-col justify-between border rounded-lg h-28 w-32 mx-2 shadow-md hover:scale-105 transition duration-200 ease-in-out cursor-pointer">
				<p className="text-sm text-center pt-2">Wei Chen</p>
				<p className="h-4 bg-green-500 rounded-b"></p>
			</div>
		</div>
	);
};

export default StudentCard;
