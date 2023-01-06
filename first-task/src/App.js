import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Navbar from "./Components/Navbar";
import Layout from "./Components/Layout";
import ShowAllBlogs from "./Components/ShowAllBlogs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/showblogs" element={<ShowAllBlogs />}></Route>

        <Route path="/dashboard/*" element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
