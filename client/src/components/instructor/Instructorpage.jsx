import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authContext";

const Instructorpage = () => {
	const { user, logout } = UserAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			<button
				className="cursor-pointer flex items-center ml-4 bg-white rounded-md shadow-lg px-4 py-2 text-gray-800 hover:bg-gray-200"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	);
};

export default Instructorpage;
