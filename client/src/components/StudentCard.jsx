import React from "react";
import ProjectDetails from "./Projects/Projects";
import { Link, redirect } from "react-router-dom";

const StudentCard = ({ student }) => {
	const onStudentCardClick = async (e) => {
		e.preventDefault();
		console.log(student);
		return redirect("/studentoverview");

		// setError("");
		// try {
		// 	//fetch and set student ID
		// 	const res = await axios.get(
		// 		`/api/student/studentInfo/${"johndoe@example.com"}`
		// 	);
		// 	console.log(res.data);
		// 	console.log(
		// 		"studenid",
		// 		res.data[0].student_id,
		// 		typeof res.data[0].student_id
		// 	);
		// 	if (res.data[0]) {
		// 		updateStudentId(res.data[0]);
		// 	}

		// 	await signIn(email, password);
		// } catch (e) {
		// 	setError(e.message);
		// 	console.log(e.message);
		// }
	};

	return (
		<Link to={`/studentoverview/${student.student_id}`}>
			<div
				key={student.student_id}
				className="flex flex-col justify-between border rounded-lg h-28 w-32 mx-2 shadow-md hover:scale-105 transition duration-200 ease-in-out cursor-pointer"
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
