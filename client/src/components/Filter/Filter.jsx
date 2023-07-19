import React from "react";
import { FaFilter } from "react-icons/fa";

function Filter() {
  const period = ["One", "Two", "Three", "Four"];
  // const from = ["One", "Two", "Three", "Four"];
  // const to = ["One", "Two", "Three", "Four"];
  const cohortName = ["One", "Two", "Three", "Four"];
  const studentName = ["One", "Two", "Three", "Four"];

  return (
    <div className=" margin-right flex ml-auto w-auto ">
      <div>
        <FaFilter />
      </div>

      <div className="flex-col text-xs text-center w-auto mb-4">
        <p className="filter-label">Period:</p>
        <input
          list="period"
          className="filter border-2 rounded border-black"
        />
        <datalist id="period">
          {period.map((op) => (
            <option key={op}>{op}</option>
          ))}
        </datalist>
      </div>
      {/* <div className="w-auto text-xs pr-4 pl-4 text-center flex-col mb-4">
        <p>From:</p>
        <input
          list="from"
          className="border-2 rounded border-black bg-transparent"
        />
        <datalist id="from">
          {from.map((op) => (
            <option key={op}>{op}</option>
          ))}
        </datalist>
      </div> */}
      {/* <div className="flex-col text-xs text-center w-auto mb-4">
        <p>To:</p>
        <input
          list="to"
          className="border-2 rounded border-black bg-transparent"
        />
        <datalist id="to">
          {to.map((op) => (
            <option key={op}>{op}</option>
          ))}
        </datalist>
      </div> */}
      <div className="flex-col text-xs pr-4 pl-4 text-center w-auto mb-4">
        <p className="filter-label">Cohort Name:</p>
        <input
          list="cohortName"
          className="filter border-2 border-black rounded"
        />
        <datalist id="cohortName">
          {cohortName.map((op) => (
            <option key={op}>{op}</option>
          ))}
        </datalist>
      </div>
      <div className="flex-col text-xs text-center w-auto mb-4">
      <p className="filter-label">Student Name:</p>
        <input
          list="studentName"
          className="filter border-2 border-black rounded"
        />
        <datalist id="studentName">
          {studentName.map((op) => (
            <option key={op}>{op}</option>
          ))}
        </datalist>
      </div>
    </div>
  );
}

export default Filter;
