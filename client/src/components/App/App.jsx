import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Signup from "../signin/login/Signup";
import Login from "../signin/login/Login";
import Account from "../signin/login/Account";
import { AuthContextProvider } from "../../context/authContext";

const App = () => {
  return (
    <div>
      <h1 className="text-center text 3xl font-bold">Firebase auth</h1>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
