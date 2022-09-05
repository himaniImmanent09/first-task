import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router'
import { getDataAPI, postDataAPI } from '../Api/Api';

const UpdateForm = () => {
    const [userDetail, setUserDetail] = useState({
        email: "",
        username: "",
    })

    let { id } = useParams();

    useEffect(() => {
        getDataAPI(`get_user/${id}`).then((res) => setUserDetail
            (res.data.user))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail((prev) => ({ ...prev, [name]: value }))
    }

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await postDataAPI(`update/${id}`, { userDetail })
        if (res.data.status === 200) {
            navigate('/dashboard')
        }
    }

    return (

        <div className='container px-5 py-5'>

            <form>
                <div className="form-group m-2">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" name="username" value={userDetail.username}
                        onChange={handleChange} />
                </div>
                <div className="form-group m-2">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name='email' value={userDetail.email}
                        onChange={handleChange} />
                </div>
                {/* <div className="form-group m-2">
                    <label>Password</label>
                    <input type="text" className="form-control" placeholder="Password" name='password' value={userDetail.password}
                        onChange={handleChange} />
                </div> */}

                <button type="submit" className="btn btn-primary m-2" onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}

export default UpdateForm