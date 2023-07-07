import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authContext";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, pass1);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-1.5 text-xs border rounded-md focus:border-custom-500  focus:outline-none"
          />
          <input
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-1.5 text-xs border rounded-md focus:border-custom-500  focus:outline-none"
          />

          <button className="bg-custom-500 rounded-full p-2">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default SignUpForm;
