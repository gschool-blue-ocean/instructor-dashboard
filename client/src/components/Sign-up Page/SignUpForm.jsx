import React, { useState } from "react";

const SignUpForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [userType, setUserType] = useState("");

	function handleSumbit(e) {
		e.preventDefault();
	}

	return (
		<section className="mt-8">
			<div className="w-2/5 mx-auto p-12 bg-white drop-shadow-lg">
				<div className="flex flex-col items-center">
					<img
						src="../Images/galvanize_logo.png"
						alt="Galvanize Inc. logo"
						className="h-12 w-64"
					/>
					<h1 className=" text-2xl mb-4 mt-2">Sign Up</h1>
				</div>
				<form onSubmit={handleSumbit} className="flex flex-col gap-2">
					<input
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						type="text"
						placeholder="First Name"
						className="p-1.5 text-xs border rounded-md focus:border-custom-500 focus:outline-none"
					/>
					<input
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						type="text"
						placeholder="Last Name"
						className="p-1.5 text-xs border rounded-md focus:border-custom-500 focus:outline-none"
					/>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
						className="p-1.5 text-xs border rounded-md focus:border-custom-500 focus:outline-none"
					/>
					<input
						value={pass}
						onChange={(e) => setPass(e.target.value)}
						type="password"
						placeholder="Password"
						className="p-1.5 text-xs border rounded-md focus:border-custom-500  focus:outline-none"
					/>
					<label htmlFor="userType"></label>
					<select
						value={userType}
						onChange={(e) => setUserType(e.target.value)}
						className="p-1.5 text-sm border rounded-md focus:border-custom-500 mb-6 focus:outline-none"
					>
						<option value="" disabled>
							Select User Type
						</option>
						<option value="student">Student</option>
						<option value="instructor">Instructor</option>
					</select>

					<button className="bg-custom-500 rounded-full p-2">Submit</button>
				</form>
			</div>
		</section>
	);
};

export default SignUpForm;
