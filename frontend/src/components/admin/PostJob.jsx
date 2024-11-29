import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Dropdown, Form } from 'react-bootstrap'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from "react-bootstrap";
import Toaster from '../ui/Toaster'
import '../../App.css'

const PostJob = () => {
  const { singleCompany } = useSelector((store) => store.company);
  const { loading } = useSelector((state) => state.auth);
  const [postJobData, setPostJobData] = useState({
    title: "",
    description: "",
    requirement: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    company: ""
  });


  const [isToast, setIsToast] = useState(false);
  const [toastDetail, setToastDetail] = useState({
    message: "",
    variant: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit kiya gaya hai');
  }

  const handleChange = (e) => {
    setPostJobData({ ...postJobData, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setPostJobData({ ...postJobData, file: e.target.files?.[0] })
  }

  const formData = new FormData()
  formData.append("name", postJobData.name)
  formData.append("description", postJobData.description)
  formData.append("website", postJobData.website)
  formData.append("location", postJobData.location)
  if (postJobData.file) {
    formData.append("file", postJobData.file)
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
            <h1>Post Job</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTitle">
                  <Form.Label style={{ fontWeight: "bold" }}>Title</Form.Label>
                  <Form.Control
                    name="title"
                    value={postJobData.title}
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
                    value={postJobData.description}
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
                    name="requirement"
                    value={postJobData.requirement}
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
                    value={postJobData.salary}
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
                    value={postJobData.location}
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
                    value={postJobData.jobType}
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
                    value={postJobData.experience}
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
                    value={postJobData.position}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>


            <Row>
              <Col md={6}>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" style={{width: '100%'}}>
                    Dropdown Button
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
      </div>

      {isToast && (
        <Toaster message={toastDetail.message} variant={toastDetail.variant} />
      )}
    </>
  )
}

export default PostJob
