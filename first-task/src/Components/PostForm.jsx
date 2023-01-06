import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { postDataAPI, getDataAPI } from "../Api/Api";

const PostForm = () => {
  const [message, setMessage] = useState("");
  const [formdata, setFormdata] = useState({
    details: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    postDataAPI(`blogs/create/${user}`, {
      details: formdata.details,
    }).then((res) => setMessage(res.data.message));

    setTimeout(() => {
      setMessage("");
      navigate("/dashboard/myblogs");
    }, 2000);
  };

  return (
    <div>
      <form className="m-5 p-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold fs-4">Details</label>
          <textarea
            type="text"
            name="details"
            className="form-control"
            rows="4"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <h5 className="text-success mb-3">{message ? message : ""}</h5>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
