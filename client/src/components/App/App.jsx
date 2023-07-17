import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  AuthContextProvider,
  UserAuth,
  useRole,
} from "../../context/authContext";
import LogIn from "../LogIn/LogIn";
import SignUpForm from "../Sign-up Page/SignUpForm";
import StudentOverview from "../Student-overview/StudentSummary";
import Header from "../Header/Header";
import AssignmentDetails from "../Assignment/Assignments";
import ProjectDetails from "../Projects/Projects";
import Feedback from "../Projects/Feedback";
import AssessDetails from "../Assessments/Assessments";
// import StudentCard from "../StudentCard";
// import Sidebar from "../Sidebar/Sidebar";

const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const navigate = useNavigate();
  const { user } = UserAuth();
  const role = useRole();

  useEffect(() => {
    if (showSideBar) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    const isLogInOrSignUp =
      location.pathname === "/" || location.pathname === "/signup";
    setHideHeader(isLogInOrSignUp);
  }, [showSideBar, location]);

  const containerStyle = {
    marginLeft: showSideBar ? "240px" : "0",
    transition: "margin-left 0.3s ease",
  };

  if (user === undefined) {
    // Still determining if the user is logged in.
    return <div>Loading...</div>;
  }

  if (user === null) {
    // StudentUser is not logged in.
    return (
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    );
  }

  if (role === "student") {
    return (
      <div>
        {showSideBar && (
          <Sidebar showSidebar={showSideBar} setShowSidebar={setShowSideBar} />
        )}
        <h1 className="text-center text-3xl font-bold"></h1>
        <div style={containerStyle}>
          <Routes>
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
          </Routes>
        </div>
      </div>
    );
  }
};
export default App;
