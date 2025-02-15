import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilterApplied, setSearchableFilterApplied, setSearchQuery } from "../redux/jobSlice";

const CategoryCarousel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleBrowse = (e) => {
    dispatch(setSearchQuery(e.target.value));
    dispatch(setFilterApplied(true))
    dispatch(setSearchableFilterApplied(true))
    navigate('/jobs')
  }

  return (
    <>
      <div className="carousel-container">
        <Carousel data-bs-theme="dark">
          <Carousel.Item className="item">
            <button value="Frontend Developer" onClick={handleBrowse} className="role-name">Frontend Developer</button>
          </Carousel.Item>
          <Carousel.Item className="item">
            <button value="Backend Developer" onClick={handleBrowse} className="role-name">Backend Developer</button>
          </Carousel.Item>
          <Carousel.Item className="item">
            <button value="Data Scientist" onClick={handleBrowse} className="role-name">Data Scientist</button>
          </Carousel.Item>
          <Carousel.Item className="item">
            <button value="DevOps Engineer" onClick={handleBrowse} className="role-name">DevOps Engineer</button>
          </Carousel.Item>
          <Carousel.Item className="item">
            <button value="UI/UX Designer" onClick={handleBrowse} className="role-name">UI/UX Designer</button>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default CategoryCarousel;