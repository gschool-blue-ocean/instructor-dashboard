import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../../context/authContext";
import LogIn from "../LogIn/LogIn";
import SignUpForm from "../Sign-up Page/SignUpForm";
import StudentOverview from "../Student-overview/StudentSummary";
import Header from "../Header/Header";

const App = () => {
  return (
    <div>
      <h1 className="text-center text 3xl font-bold"></h1>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Header />} />
          {/* <Route path="/" element={<LogIn />} /> */}
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/studentoverview" element={<StudentOverview />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
