import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import "../../App.css";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import Toaster from "../ui/Toaster";
import { setMessage, setVariant } from "../../redux/authSlice";
import { Popover } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { setSingleJob } from "../../redux/jobSlice";

const AdminJobs = () => {
  const { user } = useSelector((store) => store.auth);
  const [adminJobs, setAdminJobs] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchJob, setSearchJob] = useState("");
  const [showToaster, setShowToaster] = useState(false);
  const { message, variant } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getJobsList = async () => {
        const response = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
          params: {
            id: user?._id,
          },
        });
        console.log(response.data)
        setAdminJobs(response?.data?.jobs);
        setFilterData(response?.data?.jobs);
      };
      getJobsList();
    } catch (error) {
      console.log(error);
    }

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

  const format = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const handleSearchJob = (e) => {
    setSearchJob(e.target.value);
    setFilterData(
      adminJobs.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }

  const handleClearText = () => {
    setSearchJob('')
    setFilterData(adminJobs)
  }

  const handleCreateJob = () => {
    navigate('/admin/jobs/create')
  }

  const handleEdit = (job) => {
    dispatch(setSingleJob(job))
    navigate(`/admin/jobs/update/${job?._id}`)
  }

  const handleApplicant = (job) => {
    navigate(`/admin/jobs/${job?._id}/applicants`)
  }

  return (
    <>
      <Navbar />
      <div className="admin-jobs container mt-3">
        <div className="d-flex justify-content-between mb-4">
          <div style={{ position: 'relative' }}>
            <i className="bi bi-search" style={{ position: 'absolute', top: 7, left: 7 }}></i>
            <input
              placeholder="Filter by role"
              onChange={handleSearchJob}
              value={searchJob}
              style={{ padding: '5px 30px' }}
            />
            {
              (searchJob.length > 0) && <i onClick={handleClearText} class="bi bi-x" style={{ position: 'absolute', top: 0, right: 5, fontSize: '1.5rem' }}></i>
            }
          </div>
          <Button
            text="New Job"
            bgColor="black"
            onClick={handleCreateJob}
          />
        </div>
        {adminJobs?.length > 0 ? (
          <>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {(filterData.length > 0) ? (
                  filterData.map((job, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={job?.company?.logo} width={50} height={30} />
                        </td>
                        <td>{job?.company?.name}</td>
                        <td>
                          {job?.title}
                        </td>
                        <td>
                          {new Date(job?.createdAt)
                            .toLocaleString("en-IN", format)
                            .replaceAll("/", "-")}
                        </td>
                        <td>
                          <OverlayTrigger
                            trigger="click"
                            rootClose={true}
                            key="bottom"
                            placement="right"
                            overlay={
                              <Popover id={`popover-positioned-bottom`} style={{ width: '130px' }}>
                                <Popover.Body
                                  as={Button}
                                  // color="black"
                                  // bgColor='white'
                                  // border='none'
                                  onClick={() => handleEdit(job)}
                                >
                                  <div style={{ display: 'flex', justifyContent: 'start' }}>
                                    <i className="bi bi-pencil" style={{ paddingRight: '10px' }}></i>
                                    <span>Edit</span>
                                  </div>
                                </Popover.Body>
                                <Popover.Body
                                  as={Button}
                                  color="black"
                                  bgColor='white'
                                  border='none'
                                  onClick={() => handleApplicant(job)}
                                >
                                  <div style={{ display: 'flex', justifyContent: 'start' }}>
                                    <i className="bi bi-person" style={{ paddingRight: '10px' }}></i>
                                    <span>Applicants</span>
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
              A list of your recent registered jobs
            </p>
          </>
        ) : (
          "No Jobs Created"
        )}
      </div>
      {showToaster && <Toaster message={message} variant={variant} />}
    </>
  );
};

export default AdminJobs;
