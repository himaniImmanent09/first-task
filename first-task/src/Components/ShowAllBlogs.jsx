import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getDataAPI } from "../Api/Api";

const ShowAllBlogs = () => {
  const [data, setData] = useState([]);

  const getblogs = () => {
    getDataAPI(`blogs/all`).then((res) => setData(res.data));
  };

  console.log(data)

  useEffect(() => {
    getblogs();
  }, []);

  return (
    <div>
      <Link className="btn btn-success m-4" to="/dashboard/postform">
        Create Blog
      </Link>

      {data.length > 0
        ? data.map((item, index) => {
            console.log(item)
            return (
              <div className="conatiner m-3" key={index}>
                <div className="card">
                  <div className="d-flex">
                    <div className="card-body">
                      {/* {userData.length > 0 && userData.map((user) => {
                                        return (
                                            <>{user._id === item.userId && <h5 className='text-success'>{user.username}</h5>}</>
                                        );
                                    })} */}
                      <h5 className="text-success">{item.username}</h5>
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.details}</p>
                    </div>
                    <div className="d-flex mt-3"></div>
                  </div>
                </div>
              </div>
            );
          })
        : []}
    </div>
  );
};

export default ShowAllBlogs;
