import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import Form from "react-bootstrap/Form";
import Button from "../ui/Button";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import { useNavigate } from "react-router-dom";
import Toaster from "../ui/Toaster";
import { setLoading } from "../../redux/authSlice";

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isToast, setIsToast] = useState(false);
  const [toastDetail, setToastDetail] = useState({
    message: "",
    variant: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const registerNewCompany = async () => {
      try {
        const response = await axios.post(
          `${COMPANY_API_END_POINT}/register`,
          { companyName },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
            params: {
              id: user?._id,
            },
          }
        );
        if (response?.data?.company) {
          dispatch(setSingleCompany(response?.data?.company));
          const companyId = response?.data?.company?._id;

          setIsToast(true);
          setToastDetail((toastDetail) => ({
            ...toastDetail,
            message: response?.data?.message,
            variant: "success",
          }));
          setTimeout(() => {
            setIsToast(false);
            navigate(`/admin/companies/${companyId}`);
          }, 2000);
        }
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
      finally {
        dispatch(setLoading(false));
      }
    };
    registerNewCompany();
  };

  return (
    <>
      <Navbar />
      <div className="create-company container mt-4">
        <Form onSubmit={handleSubmit}>
          <h1>Your Company Create</h1>
          <p className="text-secondary">
            What would you like to give your company name? You can change this
            later.
          </p>
          <br />
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ fontWeight: "bold" }}>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Job Hunt, Microsoft etc."
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex gap-3">
            <Button width={100} bgColor="black" onClick={() => navigate('/admin/companies')}>
              Cancel
            </Button>
            <Button width={100} bgColor="black" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
      {isToast && (
        <Toaster message={toastDetail.message} variant={toastDetail.variant} />
      )}
    </>
  );
};

export default CompanyCreate;
