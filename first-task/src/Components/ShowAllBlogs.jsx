import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getDataAPI } from "../Api/Api";

const ShowAllBlogs = () => {
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

  console.log(user)


  const getblogs = () => {
    getDataAPI(`blogs/all`).then((res) => setData(res.data));
  };


  useEffect(() => {
    getblogs();
  }, []);

  return (
    <div>
      {user !== undefined && 
        <Link className="btn btn-success m-4" to="/dashboard/postform">
        Create Blog
      </Link>
      }
    

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
