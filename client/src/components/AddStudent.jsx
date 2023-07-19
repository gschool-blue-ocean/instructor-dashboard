import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = ({ createStudent, role }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [MCSP, setMCSP] = useState("");
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const studentData = {
				first_name: firstName,
				last_name: lastName,
				email: email,
				mcsp: MCSP,
			};
			const res = await axios.post("/api/student", studentData);
			if (res.data) {
				createStudent(res.data);
				if (role === "instructor") {
					console.log("going to instructoroverview");
					navigate("/instructoroverview");
				}
			}
		} catch (e) {
			setError(e.message);
			console.log(e.message);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-2 mx-auto mt-12"
			style={{ maxWidth: "500px", minWidth: "344px" }}
		>
			<p className="text-xl text-center mb-6">Add A User: </p>
			<input
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				type="text"
				placeholder="First Name"
				className="p-1.5 text-xs border-2 rounded-md focus:border-custom-500 focus:outline-none"
			/>
			<input
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				type="text"
				placeholder="Last Name"
				className="p-1.5 text-xs border-2 rounded-md focus:border-custom-500 focus:outline-none"
			/>
			<input
				value={MCSP}
				onChange={(e) => setMCSP(e.target.value)}
				type="text"
				placeholder="MCSP"
				className="p-1.5 text-xs border-2 rounded-md focus:border-custom-500 focus:outline-none"
			/>
			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				type="email"
				placeholder="Email"
				className="p-1.5 text-xs border-2 rounded-md focus:border-custom-500 focus:outline-none mb-4"
			/>

			<button className="bg-custom-500 rounded-full p-2">Submit</button>
		</form>
	);
};

export default AddStudent;
