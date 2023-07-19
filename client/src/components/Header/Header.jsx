import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiBellDuotone } from "react-icons/pi";
import Sidebar from "../Sidebar/Sidebar";
import Filter from "../Filter/Filter";
import { UserAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Header = ({ showSideBar, setShowSideBar }) => {
  const [firstDropdownVisible, setFirstDropdownVisible] = useState(false);
  const [secondDropdownVisible, setSecondDropdownVisible] = useState(false);
  const [thirdDropdownVisible, setThirdDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filter, setFilter] = useState(false);
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

  const firstDropdownRef = useRef(null);
  const secondDropdownRef = useRef(null);
  const thirdDropdownRef = useRef(null);

  const handleFirstDropdownToggle = () => {
    setFirstDropdownVisible(!firstDropdownVisible);
  };

  const handleSecondDropdownToggle = () => {
    setSecondDropdownVisible(!secondDropdownVisible);
  };

  const handleThirdDropdownToggle = () => {
    setThirdDropdownVisible(!thirdDropdownVisible);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setFirstDropdownVisible(false);
    setThirdDropdownVisible(false);
    setShowSideBar(false);
  };
  const handleLogoClick = () => {
    setShowSideBar((prevShowSideBar) => !prevShowSideBar);
  };

  const handleOutsideClick = (event) => {
    if (
      firstDropdownRef.current &&
      !firstDropdownRef.current.contains(event.target)
    ) {
      setFirstDropdownVisible(false);
    }
    if (
      secondDropdownRef.current &&
      !secondDropdownRef.current.contains(event.target)
    ) {
      setSecondDropdownVisible(false);
    }
    if (
      thirdDropdownRef.current &&
      !thirdDropdownRef.current.contains(event.target)
    ) {
      setThirdDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (showSideBar) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [showSideBar]);

  return (
    <div>
      {showSideBar && <Sidebar setShowSidebar={setShowSideBar} />}
      <header className={`flex p-2 `}>
        <div className="h-10 mr-2 pl-2" onClick={handleLogoClick}>
          <img
            src="https://dotcom-files.s3.us-west-2.amazonaws.com/galvanize_logo_full-color_light-background.png"
            alt="logo"
            className="h-10"
          />
        </div>
        <div className="flex ml-auto w-auto h-10 px-2">
          <div className="w-auto relative" ref={firstDropdownRef}>
            <div
              onClick={handleFirstDropdownToggle}
              className="cursor-pointer flex items-center ml-4"
            >
              <IoMdArrowDropdown className="text-gray-800" size={24} />
              {selectedOption && <div className="ml-2">{selectedOption}</div>}
            </div>
            {firstDropdownVisible && (
              <ul className="dropdown-menu absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg">
                <li>
                  <a
                    onClick={() => handleOptionClick("Test0")}
                    className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                      selectedOption === "Test0" ? "bg-gray-200" : ""
                    }`}
                    href="#"
                  >
                    Test0
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => handleOptionClick("Test1")}
                    className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                      selectedOption === "Test1" ? "bg-gray-200" : ""
                    }`}
                    href="#"
                  >
                    Test1
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => handleOptionClick("Test2")}
                    className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                      selectedOption === "Test2" ? "bg-gray-200" : ""
                    }`}
                    href="#"
                  >
                    Test2
                  </a>
                </li>
              </ul>
            )}
          </div>
          <div className="w-auto relative" ref={thirdDropdownRef}>
            <div
              onClick={handleThirdDropdownToggle}
              className="cursor-pointer flex items-center ml-4"
            >
              <PiBellDuotone className="text-gray-800" />
            </div>
            {thirdDropdownVisible && (
              <ul className="dropdown-menu absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg">
                <li className="item">
                  <a target="_blank" href="https://auth.galvanize.com/account">
                    My Account
                  </a>
                  <span className="account-email block text-gray-600">
                    timgalloway03@gmail.com
                  </span>
                </li>
              </ul>
            )}
          </div>
          <div className="w-auto relative" ref={secondDropdownRef}>
            <div
              onMouseOver={handleSecondDropdownToggle}
              className="cursor-pointer flex items-center ml-4"
            >
              <div className="user-avatar">
                <svg viewBox="0 0 80 80">
                  <text
                    fill="#FFFFFF"
                    className="text-white"
                    fontSize="36"
                    fontWeight="400"
                  >
                    <tspan textAnchor="middle" x="40" y="53">
                      TG
                    </tspan>
                  </text>
                </svg>
              </div>
              <span className="ml-2">Timothy Galloway</span>
              <IoMdArrowDropdown className="text-gray-800" size={24} />
            </div>
            {secondDropdownVisible && (
              <ul className="dropdown-menu absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg">
                <li className="item">
                  <a target="_blank" href="https://auth.galvanize.com/account">
                    My Account
                  </a>
                  <span className="account-email block text-gray-600">
                    timgalloway03@gmail.com
                  </span>
                </li>
                <li className="item">
                  <a href="/sign_out">Sign Out</a>
                </li>
              </ul>
            )}
          </div>
          <button
            className="cursor-pointer flex items-center ml-4 bg-white rounded-md shadow-lg px-4 py-2 text-gray-800 hover:bg-gray-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
      <div className="flex ml-auto w-auto">
        {/* <Filter /> */}
      </div>
    </div>
  );
};
export default Header;
