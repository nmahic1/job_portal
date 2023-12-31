import React, { useState, useEffect } from "react";
import Button from "../../Components/Button/Button";
import { useParams, Link } from "react-router-dom";

function AboutJob() {
  const [viewJob, setViewJob] = useState({});
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const fetchJobDetails = async () => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_LINK}/jobpost/load/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await result.json();
      setViewJob(json.data);
      console.log("job", json.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id, token]);

  return (
    <div className="wrapper">
      <div className="aboutjob-wrapper">
        <p className="name-aboutjob">{viewJob.companyName}</p>
        <div className="button-config">
          <Button onClick={() => alert("Implementation in process.")}>
            Apply This Job
          </Button>
        </div>
      </div>
      <div className="alignment">
        {" "}
        <h4>
          Title:{viewJob.jobTitle}
          <br></br>
          Category: {viewJob.jobCategory ? viewJob.jobCategory.title : ""}
          <br></br>
          Experience Level:{viewJob.experience}
          <br></br>
          Location: {viewJob.jobLocation}
          <br></br> Application Deadline: {viewJob.applicationDeadline}
          <br></br> Salary Range:{viewJob.salaryMin}-{viewJob.salaryMax}
        </h4>
        <h3>Description:{viewJob.description}</h3>
        <h4>
          Company Website: {viewJob.companyWebsite}
          <br></br>
        </h4>
      </div>
    </div>
  );
}

export default AboutJob;
