import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../../context/authContext";
import LogIn from "../LogIn/LogIn";
import SignUpForm from "../Sign-up Page/SignUpForm";
import AssignmentDetails from "../Assignment/Assignments";
import ProjectDetails from "../Projects/Projects";
import Feedback from "../Projects/Feedback";
import AssessDetails from "../Assessments/Assessments";

const App = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Firebase auth</h1>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/student_projects" element={<ProjectDetails />} />
          <Route path="/student_assignments" element={<AssignmentDetails />} />
          <Route path="/project_feedback" element={<Feedback />} />
          <Route path="/student_assessment" element={<AssessDetails />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
