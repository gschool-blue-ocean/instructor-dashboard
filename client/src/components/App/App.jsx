import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../../context/authContext";
import LogIn from "../LogIn/LogIn";
import SignUpForm from "../Sign-up Page/SignUpForm";
import StudentOverview from "../Student-overview/StudentSummary";
import Header from "../Header/Header";
import AssignmentDetails from "../Assignment/Assignments";
import ProjectDetails from "../Projects/Projects";
import Feedback from "../Projects/Feedback";
import AssessDetails from "../Assessments/Assessments";
import StudentCard from "../StudentCard";
import Sidebar from "../Sidebar/Sidebar";

const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    if (showSideBar) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [showSideBar]);

  const containerStyle = {
    marginLeft: showSideBar ? "240px" : "0",
    transition: "margin-left 0.3s ease",
  };

  return (
    <div>
      {showSideBar && (
        <Sidebar showSidebar={showSideBar} setShowSidebar={setShowSideBar} />
      )}
      <h1 className="text-center text-3xl font-bold"></h1>
      <AuthContextProvider>
        <div style={containerStyle}>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route
              path="/studentoverview"
              element={
                <>
                  <Header
                    showSideBar={showSideBar}
                    setShowSideBar={setShowSideBar}
                  />
                  <StudentOverview />
                </>
              }
            />
            <Route path="/student_projects" element={<ProjectDetails />} />
            <Route
              path="/student_assignments"
              element={<AssignmentDetails />}
            />
            <Route path="/project_feedback" element={<Feedback />} />
            <Route path="/student_assessment" element={<AssessDetails />} />
          </Routes>
        </div>
      </AuthContextProvider>
    </div>
  );
};

export default App;
