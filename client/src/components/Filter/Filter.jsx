import React, { useState, useEffect, useRef } from "react";

function Filter({ onCohortSelection }) {
  const [cohortName, setCohortName] = useState([]);
  const selectRef = useRef(null);

  useEffect(() => {
    fetch(`/api/mcsp/`)
      .then((response) => response.json())
      .then((data) => {
        setCohortName(data.map((item) => item.mcsp));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();
    const selectedCohort = selectRef.current.value;
    onCohortSelection(selectedCohort);
  }

  return (
    <div className="flex ml-auto w-auto m-0">
      <div className="flex-col text-l pr-4 pl-4 text-left font-bold w-auto mb-4 mt-4">
        <p className="ml-6 text-gray-200">Cohort Name</p>
        <form onSubmit={handleFormSubmit}>
          <select
            ref={selectRef}
            className="border-2 border-black rounded bg-transparent py-2 px-4"
          >
            <option className="border border-black border-solid py-2 px-4 " value="">
              Select Cohort
            </option>
            {cohortName.map((op) => (
              <option className="border border-black border-solid py-2 px-4 text-black-200" value={op} key={op}>
                {op}
              </option>
            ))}
          </select>
          <button className="border border-black border-solid border-2 py-2 px-4 ml-2 rounded-md text-gray-200" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  
}



export default Filter;
