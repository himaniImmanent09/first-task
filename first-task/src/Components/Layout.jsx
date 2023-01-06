import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import Dashboard from "./Dashboard";
import PostForm from "./PostForm";
import ShowBlogs from "./ShowBlogs";

const Layout = () => {


  return (
    <>
      <Routes>
        <Route path="/users" element={<Dashboard />}></Route>
        <Route path="/postform" element={<PostForm />}></Route>
        <Route path="/myblogs" element={<ShowBlogs />}></Route>
      </Routes>
    </>
  );
};

export default Layout;
