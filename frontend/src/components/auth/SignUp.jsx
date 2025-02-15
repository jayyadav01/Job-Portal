import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../../App.css";
import Button from "../ui/Button";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import Toaster from "../ui/Toaster";
import { setLoading } from "../../redux/authSlice";
import Navbar from "../shared/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: Number,
    password: "",
    role: "",
    file: "",
  });
  const [isToast, setIsToast] = useState(false);
  const [toastDetail, setToastDetail] = useState({
    message: "",
    variant: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setSignUpData({ ...signupData, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setSignUpData({ ...signupData, file: e.target.files?.[0] });
  };

  const formData = new FormData();
  formData.append("fullName", signupData.name);
  formData.append("email", signupData.email);
  formData.append("phoneNumber", signupData.phone);
  formData.append("password", signupData.password);
  formData.append("role", signupData.role);
  if (signupData.file) {
    formData.append("file", signupData.file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setIsToast(true);
      setToastDetail((toastDetail) => ({
        ...toastDetail,
        message: response.data.message,
        variant: "success",
      }));
      setTimeout(() => {
        setIsToast(false);
        navigate('/')
      }, 2000);
      setSignUpData({
        name: "",
        email: "",
        phone: Number,
        password: "",
        role: "",
        file: "",
      });
    } catch (error) {
      console.log(error);
      setIsToast(true);
      setToastDetail((toastDetail) => ({
        ...toastDetail,
        message: error?.response?.data?.message,
        variant: "Danger",
      }));
      setTimeout(() => {
        setIsToast(false);
      }, 2000);
    }
    dispatch(setLoading(false));
  };

  return (
    <>
      <Navbar />
      <div className="signup-parent">
        <Form className="form" onSubmit={handleSubmit}>
          <h4>Sign Up</h4>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
            <Form.Label column sm={2}>
              Full Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="name"
                value={signupData.name}
                onChange={handleChange}
                type="text"
                placeholder="name"
                required={true}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="email"
                value={signupData.email}
                onChange={handleChange}
                type="email"
                placeholder="email"
                required={true}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhone">
            <Form.Label column sm={2}>
              Phone
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="phone"
                value={signupData.phone}
                onChange={handleChange}
                type="number"
                placeholder="number"
                required={true}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
            style={{ position: "relative" }}
          >
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10} style={{position: 'relative'}}>
              <Form.Control
                name="password"
                value={signupData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                required={true}
              />
              <span
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "30px",
                  top: "15px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-slash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                )}{" "}
              </span>
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={2}>
                Role
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="student"
                  id="formHorizontalRadios1"
                  name="role"
                  value="student"
                  onChange={handleChange}
                  checked={signupData.role === "student"}
                  required={true}
                />
                <Form.Check
                  type="radio"
                  label="recruiter"
                  id="formHorizontalRadios2"
                  name="role"
                  value="recruiter"
                  onChange={handleChange}
                  checked={signupData.role === "recruiter"}
                  required={true}
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalFile">
            <Form.Label column sm={2}>
              Profile
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                required={true}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            style={{ position: "relative" }}
          >
            <Col sm={{ span: 10, offset: 2 }}>
              {loading ? (
                <Button
                  width="100%"
                  bgColor="black"
                  type="submit"
                >
                  <div className="loader"></div>
                </Button>
              ) : (
                <Button
                  width="100%"
                  bgColor="black"
                  text="Sign up"
                  type="submit"
                />
              )}
            </Col>
          </Form.Group>
          <p>
            Already have an account?{" "}
            <NavLink style={{ textDecoration: "none" }} to="/">
              Login
            </NavLink>
          </p>
        </Form>
      </div>
      {isToast && (
        <Toaster message={toastDetail.message} variant={toastDetail.variant} />
      )}
    </>
  );
};

export default SignUp;
