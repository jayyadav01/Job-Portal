import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import axios from "axios";
import { useDispatch } from "react-redux";
import "../../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import Table from "react-bootstrap/Table";
import Button from "../ui/Button";
import { Popover } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Toaster from '../ui/Toaster';

const Applicants = () => {
  const [getApplicants, setGetApplicants] = useState([]);
  const [show, setShow] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [isToast, setIsToast] = useState(false);
  const [toastDetail, setToastDetail] = useState({
    message: "",
    variant: "",
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    try {
      const getApplicantList = async () => {
        const response = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials: true
        });
        setGetApplicants(response?.data?.applicants);
      };
      getApplicantList();
    } catch (error) {
      console.log(error);
    }
  }, [])

  const format = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const handleStatus = async (status, id) => {
    console.log(id, " => ", status)
    try {
      const response = await axios.patch(`${APPLICATION_API_END_POINT}/status/${id}/update`, {
        status,
        withCredentials: true
      })

      console.log("result", response)

      if (response?.data?.message) {

        setIsToast(true);
        setToastDetail((toastDetail) => ({
          ...toastDetail,
          message: response?.data?.message,
          variant: "success",
        }));
        setTimeout(() => {
          setIsToast(false);
          // navigate(`/admin/companies/${companyId}`);
        }, 2000);
      }
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
      setShow(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="applications container mt-3">
        <h3>Applicants {getApplicants.length}</h3>
        {getApplicants?.length > 0 ? (
          <>
            <Table responsive className='mt-3'>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Resume</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {(getApplicants.length > 0) ? (
                  getApplicants.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item?.applicant?.fullName}</td>
                        <td>
                          <td>{item?.applicant?.email}</td>
                        </td>
                        <td>{item?.applicant?.phoneNumber}</td>
                        <td>
                          {item?.applicant?.profile?.resumeOriginalName ? <a href={item?.applicant?.profile?.resume} target='_blank' style={{ textDecoration: 'none' }}>{item?.applicant?.profile?.resumeOriginalName}</a> : 'NA'}
                        </td>
                        <td>
                          {new Date(item?.applicant?.createdAt)
                            .toLocaleString("en-IN", format)
                            .replaceAll("/", "-")}
                        </td>
                        <td>
                          <OverlayTrigger
                            trigger="click"
                            rootClose={true}
                            show={show}
                            onToggle={(nextShow) => setShow(nextShow)}
                            key="bottom"
                            placement="right"
                            overlay={
                              <Popover id={`popover-positioned-bottom`} style={{ width: '130px' }}>
                                <Popover.Body
                                  as={Button}
                                  onClick={() => handleStatus('accepted', item?._id)}
                                >
                                  <div style={{ display: 'flex', justifyContent: 'start' }}>
                                    <i className="bi bi-person-fill-check" style={{ paddingRight: '10px' }}></i>
                                    <span>Accept</span>
                                  </div>
                                </Popover.Body>
                                <Popover.Body
                                  as={Button}
                                  color="black"
                                  bgColor='white'
                                  border='none'
                                  onClick={() => handleStatus("rejected", item?._id)}
                                >
                                  <div style={{ display: 'flex', justifyContent: 'start' }}>
                                    <i className="bi bi-person-fill-slash" style={{ paddingRight: '10px' }}></i>
                                    <span>Reject</span>
                                  </div>
                                </Popover.Body>
                              </Popover>
                            }
                          >
                            <i className="bi bi-three-dots" style={{ cursor: 'pointer' }}></i>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No records found !!
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <p className="text-center text-secondary">
              A list of your recent applied applicant
            </p>
          </>
        ) : (
          "No applications registered"
        )}
      </div>
      {isToast && (
        <Toaster message={toastDetail.message} variant={toastDetail.variant} />
      )}
    </>
  )
}

export default Applicants
