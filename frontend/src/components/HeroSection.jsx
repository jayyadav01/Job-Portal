import React, { useState } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { setFilterApplied, setSearchableFilterApplied, setSearchQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, InputGroup, FormControl } from "react-bootstrap";

const HeroSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleJobSearch = () => {
    dispatch(setSearchQuery(searchValue));
    dispatch(setFilterApplied(true))
    dispatch(setSearchableFilterApplied(true))
    navigate("/jobs");
  };

  const handlekeyDown = (e) => {
    if (e.key === "Enter") {
      handleJobSearch();
    }
  };

  return (
    <>
      <Container className="hero-container">
        <Row style={{ textAlign: "center" }}>
          <Col>
            <p className="title">No. 1 Job Hunt Website</p>
            <h1 className="heading  ">Search, Apply &</h1>
            <h1 className="heading">
              Get Your <span>Dream Jobs</span>
            </h1>
            <p>
              JobXpress is your one-stop platform for finding the best job
              opportunities across industries.
            </p>
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: 'center',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <Col>
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
    </>
  );
};

export default HeroSection;
