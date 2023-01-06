import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getDataAPI } from "../Api/Api";

const ShowBlogs = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    getDataAPI("user/refresh_token").then(function (token) {
      if (token.data.user._id) {
        getDataAPI(
          `get_user/${token.data.user._id}`,
          token.data.access_token
        ).then((res) => setUser(res.data.user._id));
      }
    });
  }, []);

  // console.log(user)

  const getblogs = (user) => {
    if (user) {
      getDataAPI(`blogs/getdata/${user}`).then((res) => setData(res.data));
    }
  };

  useEffect(() => {
    if (user) {
      getblogs(user);
    }
  }, [user]);

  return (
    <div>
      <Link className="btn btn-success m-4" to="/dashboard/postform">
        Create Blog
      </Link>

      {data.length > 0
        ? data.map((item, index) => {
            return (
              <div className="conatiner m-3" key={index}>
                <div className="card">
                  <div className="d-flex">
                    <div className="card-body">
                      <h5 className="card-title">{item.username}</h5>
                      <p className="card-text">{item.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : []}
    </div>
  );
};

export default ShowBlogs;
