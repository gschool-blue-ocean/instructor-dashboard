import React, { useState } from "react";

const AddStudent = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			//send post request to create user on table
		} catch (e) {
			setError(e.message);
			console.log(e.message);
		}
	};
	return (
		<form
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
