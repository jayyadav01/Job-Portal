import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setFilterJobs, setFilterApplied, setSearchQuery, setSearchableFilterApplied } from "../redux/jobSlice";
import Buttons from "./ui/Button";

const filterData = [
  {
    title: "Location",
    value: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    title: "Role",
    value: ["Frontend Developer", "Backend Developer", "Mobile App Developer"],
  },
  {
    title: "Salary",
    value: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-12lakh"],
  },
];

const FilterCard = ({filterJob, updateSearchableJob}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [dispatch, selectedValue]);

  const handleRadio = (e, name) => {
    setSelectedValue((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  
  const handleApply = () => {
    setIsFilterEnabled(true)
    dispatch(setSearchableFilterApplied(false))
    dispatch(setFilterApplied(true))
    dispatch(setFilterJobs(filterJob))
  }
  
  const handleFilterClear = () => {
    setSelectedValue({
      Location: null,
      Role: null,
      Salary: null,
    });
    dispatch(setFilterApplied(false))
    dispatch(setSearchableFilterApplied(false))
    dispatch(setFilterJobs([]))
    setIsFilterEnabled(false)
    updateSearchableJob([])
  };

  const handleClick = (event) => {
    const {name, value} = event.target
    if(selectedValue[name] === value)
    {
      setSelectedValue((prevState) => ({...prevState, [name]: ''}))
    }
  }

  return (
    <>
      <div className="filter">
        <div className="title">
          <h5>Filter Jobs</h5>
          <Buttons bgColor="rgb(13, 110, 253)" onClick={handleApply}>
            Apply
          </Buttons>
          <Buttons bgColor="black" onClick={handleFilterClear} disabled={!isFilterEnabled}>
            Clear
          </Buttons>
        </div>

        {filterData.map((data, index) => (
          <div key={index}>
            <h5 className="filter-name">{data.title}</h5>
            {data.value.map((item, idx) => {
              const itemId = `${index}-${idx}`;
              return (
                <div key={itemId}>
                  <Form.Check
                    onChange={(e) => handleRadio(e, data.title)}
                    type="radio"
                    id={itemId}
                    label={item}
                    value={item}
                    name={data.title}
                    checked={selectedValue[data.title] === item}
                    onClick={handleClick}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterCard;
