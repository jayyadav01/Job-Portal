import React, { useEffect, useRef, useState } from "react";
import Navbar from "./shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import "../App.css";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  USER_API_END_POINT,
} from "../utils/constant";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import { Modal } from "react-bootstrap";
import Toaster from "./ui/Toaster";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../App.css";
import Button from "./ui/Button";
import { setLoading, setUser } from "../redux/authSlice";

const Profile = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [updateData, setUpdateData] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    // password: "",
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((item) => item),
    resume: "",
  });
  const [isToast, setIsToast] = useState(false);
  const [toastDetail, setToastDetail] = useState({
    message: "",
    variant: "",
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const profilePictureUploadRef = useRef();
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);

  const userApiUrl = process.env.USER_API_END_POINT
  console.log("user api end point => ",userApiUrl)

  useEffect(() => {
    const totalApplication = async () => {
      try {
        const result = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withcredentials: true,
          params: {
            id: user?._id,
          },
        });
        setAppliedJobs(result?.data?.appliedJobs);
      } catch (error) {
        console.log(error);
      }
    };
    totalApplication();
  }, []);

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setUpdateData({ ...updateData, file: e.target.files?.[0] });
  };

  const format = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const handleUpdate = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit", updateData);
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        updateData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          params: {
            id: user?._id,
          },
        }
      );
      dispatch(setUser(response?.data?.user));
      setIsToast(true);
      setToastDetail((toastDetail) => ({
        ...toastDetail,
        message: response.data.message,
        variant: "success",
      }));
      setTimeout(() => {
        setIsToast(false);
      }, 3000);
    } catch (error) {
      setIsToast(true);
      setToastDetail((toastDetail) => ({
        ...toastDetail,
        message: error?.response?.data?.message,
        variant: "Danger",
      }));
      setTimeout(() => {
        setIsToast(false);
      }, 3000);
    } finally {
      setShowDialog(false);
      dispatch(setLoading(false));
    }
  };

  const handleUpdateImage = () => {
    profilePictureUploadRef.current.click();
  };

  const handleFileChange = async (e) => {
    setImageLoader(true);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const response = await axios.patch(
        `${USER_API_END_POINT}/profile/picture/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          params: {
            id: user?._id,
          },
        }
      );
      console.log("response", response);
      dispatch(setUser(response?.data?.user));
      setIsToast(true);
      setToastDetail((toastDetail) => ({
        ...toastDetail,
        message: response.data.message,
        variant: "success",
      }));
      setTimeout(() => {
        setIsToast(false);
      }, 3000);
    } catch (error) {
      setIsToast(true);
      setToastDetail((toastDetail) => ({
        ...toastDetail,
        message: error?.response?.data?.message,
        variant: "Danger",
      }));
      setTimeout(() => {
        setIsToast(false);
      }, 3000);
    } finally {
      setImageLoader(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="box">
          <div className="top">
            <div className="profile-picture-wrapper">
              {imageLoader && <div className="loader-image"></div>}
              <img
                src={profilePicture || user?.profile?.profilePhoto}
                className="profile-picture"
                style={
                  imageLoader
                    ? {filter: "brightness(0.5)" }
                    : {filter: "brightness(1)" }
                }
                alt="profile"
                onClick={handleUpdateImage}
              />
              <input
                type="file"
                accept="image/*"
                ref={profilePictureUploadRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            <div>
              <h3>{user?.fullName}</h3>
              <p>{user?.profile?.bio}</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-pencil edit"
              viewBox="0 0 16 16"
              onClick={handleUpdate}
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
            </svg>
          </div>
          <div className="bottom">
            <div className="email">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg>
              <span style={{ paddingLeft: "10px" }}>{user?.email}</span>
            </div>
            <div className="phone">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-rolodex"
                viewBox="0 0 16 16"
              >
                <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1z" />
              </svg>
              <span style={{ paddingLeft: "10px" }}>{user?.phoneNumber}</span>
            </div>
            <div className="skills">
              Skills
              <Stack direction="horizontal" gap={2} className="stack">
                {user?.profile?.skills?.length > 0
                  ? user?.profile?.skills?.map((item, index) => (
                      <Badge
                        key={index}
                        bg="#F3F2F1"
                        text="#595959"
                        style={{
                          backgroundColor: "#F3F2F1",
                          color: "#595959",
                          padding: "5px 10px",
                          fontSize: "14px",
                        }}
                      >
                        {item}
                      </Badge>
                    ))
                  : "no skills added"}
              </Stack>
            </div>
            <div className="resume">
              <p>Resume</p>
              <a href={user?.profile?.resume} alt="resume">
                {user?.profile?.resumeOriginalName}
              </a>
            </div>
          </div>
        </div>
        <div className="applied-jobs">
          <h4>Applied Jobs</h4>

          {appliedJobs.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Job Role</th>
                  <th>Company</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {appliedJobs.map((jobs, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(jobs?.createdAt)
                          .toLocaleString("en-IN", format)
                          .replaceAll("/", "-")}
                      </td>
                      <td>{jobs?.job?.title}</td>
                      <td>{jobs?.job?.company?.name}</td>
                      <td>
                        <Badge
                          bg={jobs?.status === "pending" ? "red" : "green"}
                          text="#595959"
                          style={{
                            backgroundColor: "#F3F2F1",
                            color: "#595959",
                            padding: "5px 10px",
                            fontSize: "14px",
                          }}
                        >
                          {jobs?.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            "No jobs Applied"
          )}
        </div>

        <Modal show={showDialog}>
          <Modal.Header
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Modal.Title>Update</Modal.Title>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </Modal.Header>
          <Modal.Body>
            <Form className="form" onSubmit={handleSubmit}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalName"
              >
                <Form.Label column sm={2}>
                  Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="fullName"
                    value={updateData.fullName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Aman Kumar"
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="email"
                    value={updateData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="aman@gmail.com"
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalPhone"
              >
                <Form.Label column sm={2}>
                  Phone
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="phoneNumber"
                    value={updateData.phoneNumber}
                    onChange={handleChange}
                    type="number"
                    placeholder="8080808080"
                  />
                </Col>
              </Form.Group>

              {/* <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
            style={{ position: "relative" }}
          >
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="password"
                value={updateData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Aman@123"
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
              </Form.Group> */}

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalBio"
              >
                <Form.Label column sm={2}>
                  Bio
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="bio"
                    value={updateData.bio}
                    onChange={handleChange}
                    type="text"
                    placeholder="bio"
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalSkills"
              >
                <Form.Label column sm={2}>
                  Skills
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="skills"
                    value={updateData.skills}
                    onChange={handleChange}
                    type="text"
                    placeholder="skills"
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalResume"
              >
                <Form.Label column sm={2}>
                  Resume
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalUpdate"
                // style={{ position: "relative" }}
              >
                <Col sm={{ span: 10, offset: 2 }}>
                  {loading ? (
                    <Button width="100%" bgColor="black" type="submit">
                      <div id="loader"></div>
                    </Button>
                  ) : (
                    <Button
                      width="100%"
                      bgColor="black"
                      text="Update"
                      type="submit"
                    />
                  )}
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

      {isToast && (
        <Toaster message={toastDetail.message} variant={toastDetail.variant} />
      )}
    </>
  );
};

export default Profile;
