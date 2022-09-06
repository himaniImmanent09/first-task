import React ,{useEffect} from 'react'
import {  NavLink, useNavigate } from 'react-router-dom';
import { postDataAPI , getDataAPI} from '../Api/Api';

export default function Navbar() {
  let navigate = useNavigate()

  const logout = async (e) => {
    postDataAPI('user/logout').then(function (res) {
      if (res.data.status === 1) {
        navigate('/')
      }
    })
  }


  useEffect(() => {
    getDataAPI("user/refresh_token").then(function(res) {
      if (res.data.status === 0) {
        navigate("/signin");
      }
    });
  }, []);



  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Navbar</NavLink>
        {/* <h5>{user  ? user.email :""}</h5> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/dashboard/users">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/dashboard/showblogs">AllBlogs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/dashboard/myblogs">MyBlogs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">SignIn</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="signup">Signup</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="game">game</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={() => logout()}>Logout</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

