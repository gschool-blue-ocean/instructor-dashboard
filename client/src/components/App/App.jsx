import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
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
import Sidebar from "../Sidebar/Sidebar";
import Instructorpage from "../instructor/Instructorpage";
import AddStudent from "../AddStudent";
import Filter from "../Filter/Filter";
const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const navigate = useNavigate();
  const { user, isUserNew } = UserAuth();
  const role = useRole();
  const location = useLocation();
  const [studentInfo, setStudentInfo] = useState("Instructor");

  function updateStudentId(id) {
    setStudentInfo(id);
  }
  console.log("id", studentInfo);
  useEffect(() => {
    if (showSideBar) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
    // Check if the current location corresponds to the LogIn or SignUpForm routes
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
  if (user === null || isUserNew || (user && !user.emailVerified)) {
    return (
      <Routes>
        <Route path="/" element={<LogIn updateStudentId={updateStudentId} />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    );
  }
  if (role === "student") {
    return (
      <div>
        <h1 className="text-center text-3xl font-bold"></h1>
        <div style={containerStyle}>
          <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />

          <Routes>
            <Route
              path="/studentoverview"
              element={
                <>
                  <StudentOverview studentInfo={studentInfo} />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <StudentOverview studentInfo={studentInfo} />
                </>
              }
            />
          </Routes>
        </div>{" "}
        <div style={containerStyle}></div>
      </div>
    );
  }
  if (role === "instructor") {
    return (
      <div>
        <h1 className="text-center text-3xl font-bold"></h1>
        <div style={containerStyle}>
          <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />

          <Routes>
            <Route
              path="/studentoverview"
              element={
                <>
                  <StudentOverview />
                </>
              }
            />
            <Route path="addstudent" element={<AddStudent />} />
            <Route path="/" element={<Instructorpage />} />
            <Route path="/instructoroverview" element={<Instructorpage />} />
          </Routes>
        </div>{" "}
        <div style={containerStyle}></div>
      </div>
    );
  }
};
export default App;
