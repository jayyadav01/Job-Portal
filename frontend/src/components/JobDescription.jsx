import axios from "axios";
import React, { useEffect, useState } from "react";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../utils/constant";
import { useParams } from "react-router-dom";
import Stack from "react-bootstrap/esm/Stack";
import Badge from "react-bootstrap/esm/Badge";
import Buttons from "./ui/Button";
import "../App.css";
import Toaster from "./ui/Toaster";
import { useSelector } from "react-redux";

const JobDescription = () => {
  const [jobData, setJobData] = useState({});
  const [isApplied, setIsApplied] = useState(false)
  const [isToast, setIsToast] = useState(false);
  const [toastDetail, setToastDetail] = useState({
    message: "",
    variant: "",
  });
  const params = useParams();
  const jobId = params.id;
  const {user} = useSelector((store) => store.auth)

  useEffect(() => {
    if(!user)
      {
        setIsApplied(true)
      }
  }, [])

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        setJobData(res?.data?.job);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, [jobId]);

  const format = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const jobCreateDate = jobData?.createdAt;
  const date = new Date(jobCreateDate).toLocaleString("en-IN", format);
  
  const applyJobHandler = async() => {
    try
    {
      const response = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{
        withCredentials : true,
        params: {
          id: user._id
        }
      })
      setIsApplied(true)
      setIsToast(true);
      setToastDetail((toastDetail) => ({
        ...toastDetail,
        message: response?.data?.message,
        variant: "success",
      }));
      setTimeout(() => {
        setIsToast(false);
      }, 3000);
    }
    catch(error)
    {
      console.log(error)
      setIsToast(true);
      setToastDetail((toastDetail) => ({
        ...toastDetail,
        message: error?.response?.data?.message,
        variant: "Danger",
      }));
      setTimeout(() => {
        setIsToast(false);
      }, 3000);
    }
  }

  return (
    <>
      <div className="job-description">
        <div className="header">
          <Stack direction="horizontal" gap={2}>
            <Badge bg="primary" style={{ color: "#fff" }}>
              {jobData?.position} Positions
            </Badge>
            {/* <Badge bg="warning" style={{ color: "#fff" }}></Badge> */}
            <Badge bg="success" style={{ color: "#fff" }}>
              {jobData?.experience} Exp
            </Badge>
          </Stack>
          <Buttons
            text="Apply Now"
            width="110px"
            bgColor="rgb(13, 110, 253)"
            onClick={isApplied ? () => {} : applyJobHandler}
            disabled={isApplied}
          />
        </div>
        <h4>Job Description</h4>
        <div className="job-details">
          <ul>
            <li>
              <span>Role: </span>
              {jobData?.title}
            </li>
            <li>
              <span>Location: </span>
              {jobData?.location}
            </li>
            <li>
              <span>Description: </span>
              {jobData?.description}
            </li>
            <li>
              <span>Requirements: </span>
              {jobData?.requirements}
            </li>
            <li>
              <span>Experience:</span> {jobData?.experience} yrs{" "}
            </li>
            <li>
              <span>Salary:</span> {jobData?.salary}
            </li>
            <li>
              <span>Total Applicants:</span> {jobData?.applications?.length}
            </li>
            <li>
              <span>Posted Date:</span> {date}
            </li>
          </ul>
        </div>
      </div>
      {isToast && (
        <Toaster message={toastDetail.message} variant={toastDetail.variant} />
      )}
    </>
  );
};

export default JobDescription;
