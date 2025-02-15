import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import Button from "../ui/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap"; 
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import '../../App.css'
import { setLoading } from "../../redux/authSlice";
import Toaster from "../ui/Toaster";

const CompanySetup = () => {
  const { singleCompany } = useSelector((store) => store.company);
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [updateCompanyData, setUpdateCompanyData] = useState({
    name: singleCompany?.name || "",
    description: singleCompany?.description || "",
    website: singleCompany?.website || "",
    location: singleCompany?.location || "",
    file: null
  });

  const [isToast, setIsToast] = useState(false);
  const [toastDetail, setToastDetail] = useState({
    message: "",
    variant: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUpdateCompanyData({ ...updateCompanyData, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setUpdateCompanyData({ ...updateCompanyData, file: e.target.files?.[0] })
  }

  const formData = new FormData()
  formData.append("name", updateCompanyData.name)
  formData.append("description", updateCompanyData.description)
  formData.append("website", updateCompanyData.website)
  formData.append("location", updateCompanyData.location)
  if (updateCompanyData.file) {
    formData.append("file", updateCompanyData.file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await axios.put(
        `${COMPANY_API_END_POINT}/update/${singleCompany?._id}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      console.log(response)

      setIsToast(true);
      setToastDetail((toastDetail) => ({
        ...toastDetail,
        message: response?.data?.message,
        variant: "success",
      }));
      setTimeout(() => {
        setIsToast(false);
        navigate('/admin/companies')
      }, 2000);
    }
    catch (error) {
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
    finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="company-setup container mt-3">
        <div className="d-flex align-items-center gap-3 mb-3">
          <Button
            width={100}
            height={37}
            bgColor="black"
            onClick={() => navigate("/admin/companies")}
          >
            Back
          </Button>
          <h1>Company Setup</h1>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlName">
            <Form.Label style={{ fontWeight: "bold" }}>Company Name</Form.Label>
            <Form.Control
              name="name"
              value={updateCompanyData.name}
              onChange={handleChange}
              type="text"
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlDescription"
          >
            <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
            <Form.Control
              name="description"
              value={updateCompanyData.description}
              onChange={handleChange}
              type="text"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlWebsite">
            <Form.Label style={{ fontWeight: "bold" }}>Website</Form.Label>
            <Form.Control
              name="website"
              value={updateCompanyData.website}
              onChange={handleChange}
              type="text"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlLocation">
            <Form.Label style={{ fontWeight: "bold" }}>Location</Form.Label>
            <Form.Control
              name="location"
              value={updateCompanyData.location}
              onChange={handleChange}
              type="text"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlLogo">
            <Form.Label style={{ fontWeight: "bold" }}>Logo</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
            />
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlUpdate">
            <Col>
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
      </div>
      {isToast && (
        <Toaster message={toastDetail.message} variant={toastDetail.variant} />
      )}
    </>
  );
};

export default CompanySetup;
