import React, { useState } from "react";
import Button from "../ui/Button";
import "../../App.css";
import { Link, NavLink } from "react-router-dom";
import PopOver from "../ui/PopOver";
// import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setFilterApplied, setSearchableFilterApplied } from "../../redux/jobSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch()

  // const token = Cookies.get("token");

  function handleJob() {
    dispatch(setFilterApplied(false))
    dispatch(setSearchableFilterApplied(false))
  }


  return (
    <>
      <div className="navbar navbar-expand-sm">
        <div className="container-fluid">
          <div className="logo navbar-brand">
            Job<span className="portal">Hunt</span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className='bar collapse navbar-collapse' id="collapsibleNavbar">
            <ul className="navbar-nav ms-auto gap-3">
              {
                user?.role === "recruiter" ? (
                  <>
                    <li className="nav-item"><NavLink to="/admin/companies" className="nav-link"> Companies </NavLink></li>
                    <li className="nav-item"><NavLink to="/admin/jobs" className="nav-link">Jobs</NavLink></li>
                  </>
                ) : (
                  <>
                    <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
                    <li className="nav-item"><NavLink to="/jobs" className="nav-link" onClick={handleJob}>Jobs</NavLink></li>
                  </>
                )
              }
              {
                user ?
                  <li className="nav-item"> <PopOver /></li>
                  :
                  <>
                    <li className="nav-item"><Link to="/login"><Button variant="light" text="Login" /></Link></li>
                    <li className="nav-item"><Link to="/signup"><Button variant="primary" text="Signup" /></Link></li>
                  </>
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
