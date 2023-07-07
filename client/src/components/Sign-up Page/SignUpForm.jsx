import React, { useState } from "react";

const SignUpForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [userType, setUserType] = useState("");
	const [cohort, setCohort] = useState("");

	function handleSumbit(e) {
		e.preventDefault();
		//do registration stuff
	}

	return (
		<section className="mt-8 min-h-screen bg-{#f1f5f9}">
			<div
				className="w-2/5 mx-auto p-12 bg-white drop-shadow-lg"
				style={{ maxWidth: "500px", minWidth: "344px" }}
			>
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
					<select
						value={userType}
						onChange={(e) => setUserType(e.target.value)}
						className="p-1.5 text-xs border rounded-md text-slate-400 focus:border-custom-500 mb-6 focus:outline-none"
					>
						<option value="" disabled>
							Select User Type
						</option>
						<option value="student">Student</option>
						<option value="instructor">Instructor</option>
					</select>
					{userType === "student" && (
						<select
							value={cohort}
							onChange={(e) => setCohort(e.target.value)}
							className="p-1.5 text-xs border rounded-md text-slate-400 focus:border-custom-500 mb-6 focus:outline-none"
						>
							<option value="" disabled>
								Select Cohort
							</option>
							<option value="mcsp-22">mcsp-22</option>
							<option value="mcsp-21">mcsp-21</option>
							<option value="mcsp-20">mcsp-20</option>
						</select>
					)}
					<button className="bg-custom-500 rounded-full p-2">Submit</button>
				</form>
			</div>
		</section>
	);
};

export default SignUpForm;
