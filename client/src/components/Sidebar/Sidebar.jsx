import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "react-pro-sidebar";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonPlusFill } from "react-icons/bs";

function Sidebar({ showSidebar, setShowSidebar, role }) {
  const handleOnClick = () => {
    setShowSidebar(false);
  };

  const handleOutsideClick = (event) => {
    const sidebarElement = document.getElementById("sidebar");

    if (
      showSidebar &&
      sidebarElement &&
      !sidebarElement.contains(event.target)
    ) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSidebar, setShowSidebar]);

  return (
    <div
      id="sidebar"
      className={`sidebar ${
        showSidebar ? "show" : ""
      } w-60 left-0 transition-left absolute duration-100`}
    >
      <Menu className="h-screen text-white bg-zinc-600">
        <div>
          <div className="overflow-y-auto scrollbar-medium scrollbar-thumb-transparent-900 scrollbar-track-blue-100 flex-col justify-start items-start h-[calc(100%-48px)] ">
            <div
              id="homelink"
              onClick={handleOnClick}
              className="flex items-center p-2 text-white bg-zinc-600 hover:text-opacity-60 md:hover:border md:hover:border-teal-800 md:hover:bg-teal-800"
            >
              <AiFillHome className="w-7 h-7 mr-2" />
              <p>Home</p>
            </div>
          </div>
          <div>
            <Link to="/AddStudent">
              <div className="flex items-center p-2 text-white bg-zinc-600 hover:text-opacity-60 md:hover:border md:hover:border-teal-800 md:hover:bg-teal-800">
                <BsFillPersonPlusFill className="w-7 h-7 mr-2" />
                <p>Add User</p>
              </div>
            </Link>
          </div>
        </div>
      </Menu>
    </div>
  );
}

export default Sidebar;
