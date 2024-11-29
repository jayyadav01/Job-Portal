import React, { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import "../App.css";
import JobCard from "./ui/JobCard";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";

const LatestJobs = () => {
  const [jobData, setJobData] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        setJobData(response?.data?.jobs);
        dispatch(setAllJobs(response?.data?.jobs))
      } catch (error) {
        console.log(error);
      }
    };
    getJob();
  }, []);

  let end = jobData.length
  let start = end - 6

  return (
    <>
      <div className="latestjobs-container">
        <h1>
          <span>Latest & Top</span> Job Openings
        </h1>

        <div className="cards">
          {jobData.length > 0 ? (
            <JobCard jobs={jobData.slice(start, end).reverse()} />
          ) : (
            <span style={{ color: "red", fontSize: "1.2rem" }}>
              No Jobs available
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default LatestJobs;
