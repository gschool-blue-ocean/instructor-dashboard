import React from "react";
import ProjectDetails from "./Projects/Projects";
import { Link } from "react-router-dom";

const StudentCard = ({ student }) => {
	//eventually will receive cohort data and will conditionally render the name and color of the card based on their individual performance
	console.log(student);

	return (
		<Link to="/studentoverview">
			<div className="flex flex-col justify-between border rounded-lg h-28 w-32 mx-2 shadow-md hover:scale-105 transition duration-200 ease-in-out cursor-pointer">
				<p className="text-sm text-center pt-2">
					{student.first_name + " " + student.last_name}
				</p>
				<p className="h-4 bg-yellow-300 rounded-b"></p>
			</div>
		</Link>
	);
};

export default StudentCard;
