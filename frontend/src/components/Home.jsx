import React, { useEffect, useState } from "react";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import Toaster from "./ui/Toaster";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessage, setVariant } from "../redux/authSlice";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import CategoryCarousel from "./CategoryCarousel";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showToaster, setShowToaster] = useState(false);
  const { message, variant } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (message && variant) {
      setShowToaster(true);

      const timer = setTimeout(() => {
        setShowToaster(false);
        dispatch(setMessage(""));
        dispatch(setVariant(""));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, variant, dispatch, navigate]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
      {showToaster && <Toaster message={message} variant={variant} />}
    </>
  );
};
export default Home;
