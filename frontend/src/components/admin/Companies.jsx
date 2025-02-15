import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import "../../App.css";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import Toaster from "../ui/Toaster";
import { setMessage, setVariant } from "../../redux/authSlice";
import { Popover } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { setCompanies, setSingleCompany } from "../../redux/companySlice";

const Companies = () => {
  const { user } = useSelector((store) => store.auth);
  const [adminCompanies, setAdminCompanies] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchCompany, setSearchCompany] = useState("");
  const [showToaster, setShowToaster] = useState(false);
  const { message, variant } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getCompaniesList = async () => {
        const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
          params: {
            id: user?._id,
          },
        });
        setAdminCompanies(response?.data?.companies);
        dispatch(setCompanies(response?.data?.companies));
        setFilterData(response?.data?.companies);
      };
      getCompaniesList();
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

  const handleSearchCompany = (e) => {
    setSearchCompany(e.target.value);
    setFilterData(
      adminCompanies.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }
  
  const handleClearText = () => {
    setSearchCompany('')
    setFilterData(adminCompanies)
  }

  const handleCreateCompany = () => {
    navigate('/admin/companies/create')
  }

  const handleEdit = (company) => {
    dispatch(setSingleCompany(company))
    navigate(`/admin/companies/${company?._id}`)
  }

  return (
    <>
      <Navbar />
      <div className="admin-companies container mt-3">
        <div className="d-flex justify-content-between mb-4">
          <div style={{position: 'relative'}}>
          <i className="bi bi-search" style={{position: 'absolute', top: 7, left: 7}}></i>
          <input
            placeholder="Filter by name"
            onChange={handleSearchCompany}
            value={searchCompany}
            style={{padding: '5px 30px'}}
          />
          {
            (searchCompany.length>0) && <i onClick={handleClearText} class="bi bi-x" style={{position: 'absolute', top: 0, right: 5, fontSize: '1.5rem'}}></i>
          }
          </div>
          <Button
            text="New Company"
            bgColor="black"
            onClick={handleCreateCompany}
          />
        </div>
        {adminCompanies?.length > 0 ? (
          <>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Website</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {(filterData.length > 0) ? (
                  filterData.map((company, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={company?.logo} width={50} height={30} />
                        </td>
                        <td>{company?.name}</td>
                        <td>
                          <a href={company?.website}> {company?.website}</a>
                        </td>
                        <td>
                          {new Date(company?.createdAt)
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
                              <Popover id={`popover-positioned-bottom`} style={{ width: '100px' }}>
                                <Popover.Body
                                  as={Button}
                                  color="black"
                                  bgColor='white'
                                  border='none'
                                  onClick={() => handleEdit(company)}
                                >
                                  <i className="bi bi-pencil" style={{paddingRight: '10px'}}></i>
                                  Edit
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
              A list of your recent registered companies
            </p>
          </>
        ) : (
          "No Companies Created"
        )}
      </div>
      {showToaster && <Toaster message={message} variant={variant} />}
    </>
  );
};

export default Companies;
