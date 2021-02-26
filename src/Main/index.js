import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "./style.css";

function Main () {

  const [employeeData, setEmplyeeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [order, setOrder] = useState("ascending");

  useEffect(() => {
    api.getEmployees().then((res) => {
      //set the sate of the employee and intilaize filtered data
      setEmplyeeData(res.data.results);
      setFilteredData(res.data.results);
    });
  },[]);//componenetDidMount

  const renderEmployees = () => {
    console.log(filteredData);
    const employeeArr = filteredData.map((employee) => {
        return (
          <tr key={employee.login.uuid}>
            <td><img src={employee.picture.medium}/></td>
            <td>{employee.name.first} {employee.name.last}</td>
            <td>{employee.phone}</td>
            <td>{employee.email}</td>
            <td>{employee.dob.date}</td>
          </tr>
        );
    });

    return employeeArr;
  };

  const handleSearch = () => {
    //get the user input
    const input = document.querySelector("#search-employee").value.toLowerCase();
    //filter out the non matchers
    const filteredArr = employeeData.filter((employee) => employee.name.first.toLowerCase().indexOf(input) > -1);
    //set state of the filter to trigger a reredner
    setFilteredData(filteredArr);
  }

  const handleNameClick = () => {
    console.log("clicked!!");
    //check the state

    if (order === "ascending") {
      const sortedArr = filteredData.sort((a,b) => {
        if (a.name.first < b.name.first) return -1;
      });
      setFilteredData(sortedArr);
      setOrder("descending");
    } else if (order === "descending") {
      const sortedArr = filteredData.sort((a,b) => {
        if (a.name.first > b.name.first) return 1;
      });
      setFilteredData(sortedArr);
      setOrder("ascending");
    }
  }

    return (
      <>
      <div className="container" id="search-box">
        <h3>Search By Name</h3>
        <input id="search-employee" placeholder="Enter Employee Name" onChange={handleSearch}/>
        </div>
        <div className="container">
          <div class="row justify-content-center">
            <div class="col-12">
              <table class="table table-success table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col"><button type="button" onClick={handleNameClick}>Name</button></th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">DOB</th>
                </tr>
              </thead>
              <tbody>
                {renderEmployees()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

export default Main;