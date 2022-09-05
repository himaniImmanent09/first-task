import React ,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { postDataAPI , getDataAPI} from '../Api/Api';

export default function Navbar() {
  const [user, setUser] = useState()
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
        console.log(res.data.status);
        navigate("/signin");
      }
    });
  }, []);



  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        {/* <h5>{user  ? user.email :""}</h5> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/showblogs">AllBlogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/myblogs">MyBlogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">SignIn</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="signup">Signup</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={() => logout()}>Logout</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

