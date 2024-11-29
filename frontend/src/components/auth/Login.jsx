import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../../App.css";
import Navbar from "../shared/Navbar";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Toaster from "../ui/Toaster";
import {
  setLoading,
  setMessage,
  setUser,
  setVariant,
} from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie'

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [isToast, setIsToast] = useState(false);
  const [toastDetail, setToastDetail] = useState({
    message: "",
    variant: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { message, variant } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  // useEffect(() => {
  //     Cookies.remove('token')
  //     navigate("/")
  // }, [])

  useEffect(() => {
    if (message && variant) {
      setIsToast(true);
      setToastDetail((toastDetail) => ({
        ...toastDetail,
        message: message,
        variant: variant,
      }))
      const timer = setTimeout(() => {
        setIsToast(false);
        dispatch(setMessage(""));
        dispatch(setVariant(""));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, variant, dispatch, navigate]);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  const payload = {
    email: loginData.email,
    password: loginData.password,
    role: loginData.role,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    await axios
      .post(`${USER_API_END_POINT}/login`, payload, { withCredentials: true })
      .then((response) => {
        dispatch(setUser(response.data.user));
        dispatch(setMessage("Login Successfully"));
        dispatch(setVariant("success"));
        if(loginData.role === "recruiter")
        {
          navigate("/admin/companies");  
        }
        else
        {
          navigate("/");
        }
      })
      .catch((error) => {
        setIsToast(true);
        setToastDetail((toastDetail) => ({
          ...toastDetail,
          message: error?.response?.data?.message,
          variant: "Danger",
        }));
        setTimeout(() => {
          setIsToast(false);
        }, 2000);
      });
    dispatch(setLoading(false));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  

  return (
    <>
      <Navbar />
      <div className="login-parent">
        <Form className="form" onSubmit={handleSubmit}>
          <h4>Login</h4>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="email"
                value={loginData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
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
                value={loginData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
                Roles
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="student"
                  id="formHorizontalRadios1"
                  name="role"
                  value="student"
                  onChange={handleChange}
                  checked={loginData.role === "student"}
                  required={true}
                />
                <Form.Check
                  type="radio"
                  label="recruiter"
                  id="formHorizontalRadios2"
                  name="role"
                  value="recruiter"
                  onChange={handleChange}
                  checked={loginData.role === "recruiter"}
                  required={true}
                />
              </Col>
            </Form.Group>
          </fieldset>

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
                  text="Login"
                  type="submit"
                />
              )}
            </Col>
          </Form.Group>

          <p>
            Don't have an account?{" "}
            <NavLink style={{ textDecoration: "none" }} to="/signup">
              Signup
            </NavLink>
          </p>
        </Form>
      </div>
      {isToast && (
        <Toaster message={toastDetail.message} variant={toastDetail.variant} />
      )}
    </>
  );
}

export default Login;