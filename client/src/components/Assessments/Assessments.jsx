import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";



const assessDetails = Object.freeze([
    { ID: 1, Week: '02', Assessment: 'DOM API Assessment', Grade: '95%' },
    { ID: 2, Week: '06', Assessment: 'Server Side Assessment', Grade: '92%' },
    { ID: 3, Week: '07', Assessment: 'Server and DB Assessment', Grade: '94%' },
    { ID: 4, Week: '10', Assessment: 'React Assessment', Grade: '96%' },

]);



function AssessDetails() {
    // const [assessment, setAssessment] = useState(null);

    async function fetchAssessment() {
        try {
            const res = await axios.get(`/api/assessment`);
            if (res.data.length > 0) {
                // setAssessment(res.data);

    console.log(res.data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    fetchAssessment();
    // useEffect(() => {
    //  // fetchAssessment();
    //     console.log("Command Line Test")
    // }, []);

    function handleClick(e){
        let id = e.target.dataset.id;
        console.log("id", id);
    }

    const arrDetails = assessDetails.map(detail => 
        <tr key={detail.ID} >
            <td>{detail.Week} </td>
            <td>{detail.Assessment} </td>
            <td>{detail.Grade} </td>
        </tr>);
    return (
        <section className="mx-auto mt-8 min-h-screen bg-{#f1f5f9}"
            style={{ maxWidth: "600px", minWidth: "344px" }}
        >
           <table>
                <caption>Assessment Results</caption>
                <thead>
                    <tr>
                        <th>Week</th>
                        <th>Assessment</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {arrDetails}
                </tbody>
           </table>
        </section>
    );
};


export default AssessDetails;
