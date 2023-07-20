import React from "react";
import ProjectDetails from "./Projects/Projects";
import { Link, redirect } from "react-router-dom";

const StudentCard = ({ student }) => {
	const onStudentCardClick = async (e) => {
		e.preventDefault();
		console.log(student);
		return redirect("/studentoverview");
	};

	return (
		<Link to={`/studentoverview/${student.student_id}`}>
			<div
				key={student.student_id}
				className="flex flex-col justify-between border rounded-lg h-28 w-32 mx-2 shadow-md hover:scale-105 transition duration-200 ease-in-out cursor-pointer mb-3"
			>
				<p className="text-sm text-center pt-2">
					{student.first_name + " " + student.last_name}
				</p>
				<p className="h-4 bg-orange-200 rounded-b"></p>
			</div>
		</Link>
	);
};

export default StudentCard;
