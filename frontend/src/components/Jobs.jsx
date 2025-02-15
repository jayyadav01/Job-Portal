import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import { JOB_API_END_POINT } from "./../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllJobs,
  setFilterApplied,
  setSearchableFilterApplied,
  setSearchableJobs,
} from "../redux/jobSlice";
import { setLoading } from "../redux/authSlice";
import "../App.css";
import JobCard from "./ui/JobCard";
import noJobImage from "../assets/no_job.jpg";
import { Row, Col, Container, InputGroup, FormControl } from "react-bootstrap";

const Jobs = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const {
    searchQuery,
    filterApplied,  
    searchableFilterApplied,
    allJobs,
    filterJobs,
    searchableJobs,
  } = useSelector((store) => store.job);

  const [searchValue, setSearchValue] = useState("");

  const getAllJob = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${JOB_API_END_POINT}/get`, {
        withCredentials: true,
      });
      dispatch(setAllJobs(response?.data?.jobs));
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  const animationUrl = 'https://lottie.host/fab3dc70-90e1-44cd-a29a-8b3b4d6c9829/VDoWbXZ2i8.json'

  useEffect(() => {
    if (typeof searchQuery === "object") {
      getAllJob();
    }
  }, []);

  let filtered;
  useEffect(() => {
    if (
      searchQuery?.Location === null &&
      searchQuery?.Role === null &&
      searchQuery?.Salary === null
    ) {
      getAllJob();
    }
    if (typeof searchQuery === "string" && searchQuery.trim() !== "") {
      const searchData = allJobs?.filter((item) => {
        const roleMatch =
          searchQuery && item?.title
            ? item?.title.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return roleMatch;
      });
      dispatch(setSearchableJobs(searchData));
      dispatch(setFilterApplied(true));
      dispatch(setSearchableFilterApplied(true));
    }
  }, [searchQuery]);

  function SalaryConvertToNumber(value) {
    return Number(
      value
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace("lakh", "00000")
        .replace("k", "000")
    );
  }
  let start, end;
  if (
    searchQuery?.Salary !== null &&
    searchQuery?.Salary !== undefined &&
    searchQuery?.Salary !== ""
  ) {
    const salaryRange = searchQuery.Salary;
    start = salaryRange.split("-")[0];
    end = salaryRange.split("-")[1];

    start = SalaryConvertToNumber(start);
    end = SalaryConvertToNumber(end);
  }

  const handleJobSearch = () => {
    const searchData = allJobs?.filter((item) => {
      const roleMatch =
        searchValue && item?.title
          ? item?.title.toLowerCase().includes(searchValue.toLowerCase())
          : true;
      return roleMatch;
    });
    dispatch(setSearchableJobs(searchData));
    dispatch(setFilterApplied(true));
    dispatch(setSearchableFilterApplied(true));
  };

  const handlekeyDown = (e) => {
    if (e.key === "Enter") {
      handleJobSearch();
    }
  };

  const updateSearchableJob = (newJob) => {
    dispatch(setSearchableJobs(newJob));
  };

  if (searchableJobs?.length > 0) {
    filtered = searchableJobs?.filter((item) => {
      const roleMatch =
        searchQuery.Role && item?.title
          ? item?.title.includes(searchQuery.Role)
          : true;

      const locationMatch =
        searchQuery.Location && item?.location
          ? item?.location.includes(searchQuery.Location)
          : true;

      const salaryMatch =
        start !== undefined && end !== undefined
          ? item.salary >= start && item.salary <= end
          : true;

      return roleMatch && locationMatch && salaryMatch;
    });
  } else {
    filtered = allJobs?.filter((item) => {
      const roleMatch =
        searchQuery.Role && item?.title
          ? item?.title.includes(searchQuery.Role)
          : true;

      const locationMatch =
        searchQuery.Location && item?.location
          ? item?.location.includes(searchQuery.Location)
          : true;

      const salaryMatch =
        start !== undefined && end !== undefined
          ? item.salary >= start && item.salary <= end
          : true;

      return roleMatch && locationMatch && salaryMatch;
    });
  }

  return (
    <>
      <Navbar />
      <div className="job-container">
        <FilterCard
          filterJob={filtered}
          updateSearchableJob={updateSearchableJob}
        />
        <div className="job-box">
          <div className="search-box">
            <Container>
              <Row style={{ justifyContent: "center" }}>
                <Col xs={6} sm={8} md={10} lg={12}>
                  <div className="search-bar">
                    <InputGroup>
                      <FormControl
                        placeholder="Find your dream jobs"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handlekeyDown}
                      />
                    </InputGroup>
                    <span className="search-icon" onClick={handleJobSearch}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                      </svg>
                    </span>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          {loading ? (
            <div className="job-loader-box">
              <div className="job-loader"></div>
            </div>
          ) : (
            <div className="jobs">
              <div className="cards">
                {filterApplied ? (
                  searchableFilterApplied ? (
                    searchableJobs?.length > 0 ? (
                      <>
                        <h6>Search results : {searchableJobs.length}</h6>
                        <JobCard jobs={searchableJobs} />
                      </>
                    ) : (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <img
                          src={noJobImage}
                          width={400}
                          height={400}
                          alt="no job"
                        />
                      </div>
                    )
                  ) : filterJobs?.length > 0 ? (
                    <>
                      <h6>Search results : {filterJobs.length}</h6>
                      <JobCard jobs={filterJobs} />
                    </>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={noJobImage}
                        width={400}
                        height={400}
                        alt="no job"
                      />
                    </div>
                  )
                ) : allJobs?.length > 0 ? (
                  <>
                    <h6>Search results : {allJobs.length}</h6>
                    <JobCard jobs={allJobs.slice().reverse()} />
                  </>
                ) : (
                  <span style={{ color: "red", fontSize: "1.2rem" }}>
                    No Jobs available in all Jobs
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
