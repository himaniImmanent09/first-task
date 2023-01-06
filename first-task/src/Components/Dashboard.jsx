import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {  getDataAPI } from "../Api/Api";



const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataAPI("users").then((res) => setData(res.data));
  }, []);

  return (
    <>
      <div className="container mt-5">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              {/* <th scope="col">Password</th> */}
            </tr>
          </thead>
          <tbody>
            {data.length > 0
              ? data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                    </tr>
                  );
                })
              : []}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
