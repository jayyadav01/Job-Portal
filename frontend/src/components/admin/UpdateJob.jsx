import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Form } from 'react-bootstrap'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from "react-bootstrap";
import Toaster from '../ui/Toaster'
import '../../App.css'
import CustomDropdown from '../ui/CustomDropdown'
import { setLoading } from '../../redux/authSlice'
import { JOB_API_END_POINT } from '../../utils/constant'
import axios from 'axios'

const UpdateJob = () => {
    const { singleJob } = useSelector((store) => store.job);
    const [updateJobData, setupdateJobData] = useState({
        title: singleJob?.title || "",
        description: singleJob?.description || "",
        requirements: singleJob?.requirements || "",
        salary: singleJob?.salary || "",
        location: singleJob?.location || "",
        jobType: singleJob?.jobType || "",
        experience: singleJob?.experience || "",
        position: singleJob?.position || 0,
        companyId: singleJob?.company?._id || ""
    });
    const [isToast, setIsToast] = useState(false);
    const [toastDetail, setToastDetail] = useState({
        message: "",
        variant: "",
    });

    const { loading } = useSelector((store) => store.auth);
    const { companies } = useSelector((store) => store.company);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handelCompanyChange = (value) => {
        setupdateJobData({ ...updateJobData, companyId: value })
    }

    const handleChange = (e) => {
        setupdateJobData({ ...updateJobData, [e.target.name]: e.target.value });
    };

    const formData = new FormData()
    formData.append("title", updateJobData.title)
    formData.append("description", updateJobData.description)
    formData.append("requirements", updateJobData.requirements)
    formData.append("salary", updateJobData.salary)
    formData.append("location", updateJobData.location)
    formData.append("jobType", updateJobData.jobType)
    formData.append("experience", updateJobData.experience)
    formData.append("position", updateJobData.position)
    formData.append("companyId", updateJobData.companyId)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submit', updateJobData);
        dispatch(setLoading(true));
        try {
            const response = await axios.put(
                `${JOB_API_END_POINT}/update/job/${singleJob?._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
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
                navigate('/admin/jobs')
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
    }

    return (
        <>
            <Navbar />
            <div className='container mt-3'>
                <div className='flex items-center justify-center w-screen my-5'>
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <Button
                            width={100}
                            height={37}
                            bgColor="black"
                            onClick={() => navigate("/admin/jobs")}
                        >
                            Back
                        </Button>
                        <h1>Update Job</h1>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTitle">
                                    <Form.Label style={{ fontWeight: "bold" }}>Title</Form.Label>
                                    <Form.Control
                                        name="title"
                                        value={updateJobData.title}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlDescription"
                                >
                                    <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
                                    <Form.Control
                                        name="description"
                                        value={updateJobData.description}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={6}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlRequirement"
                                >
                                    <Form.Label style={{ fontWeight: "bold" }}>Requirement</Form.Label>
                                    <Form.Control
                                        name="requirements"
                                        value={updateJobData.requirements}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlSalary">
                                    <Form.Label style={{ fontWeight: "bold" }}>Salary</Form.Label>
                                    <Form.Control
                                        name="salary"
                                        value={updateJobData.salary}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlLocation">
                                    <Form.Label style={{ fontWeight: "bold" }}>Location</Form.Label>
                                    <Form.Control
                                        name="location"
                                        value={updateJobData.location}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlJobType">
                                    <Form.Label style={{ fontWeight: "bold" }}>Job Type</Form.Label>
                                    <Form.Control
                                        name="jobType"
                                        value={updateJobData.jobType}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlExperience">
                                    <Form.Label style={{ fontWeight: "bold" }}>Experience Level</Form.Label>
                                    <Form.Control
                                        name="experience"
                                        value={updateJobData.experience}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlPosition">
                                    <Form.Label style={{ fontWeight: "bold" }}>No of Position</Form.Label>
                                    <Form.Control
                                        name="position"
                                        value={updateJobData.position}
                                        onChange={handleChange}
                                        type="number"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlPosition">
                                    <CustomDropdown
                                        variant='grey'
                                        heading={singleJob?.company?.name || 'choose your company'}
                                        style={{ width: '100%', border: '1px solid lightgray' }}
                                        companies={companies}
                                        onCompanyChange={handelCompanyChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>


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
            </div >

            {isToast && (
                <Toaster message={toastDetail.message} variant={toastDetail.variant} />
            )
            }
        </>
    )
}

export default UpdateJob
