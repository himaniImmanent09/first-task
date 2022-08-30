import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignIn() {

    const [status, setStatus] = useState()
    const [formData, setFormdata] = useState({
        email: '',
        password: ''

    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post("/login", { formData })
            .then((res) => setStatus(res.data))

    }


    if (status === 200) {
        navigate('/dashboard')
    }

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-5">
                    <h3>SignIn Form</h3>
                    <form className='shadow p-4' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label ms-0">Email address</label>
                            <input type="email" className="form-control"
                                name='email'
                                onChange={handleChange} />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password"
                                name='password'
                                className="form-control"
                                onChange={handleChange} />
                        </div>
                        <button className='btn btn-primary'>Login</button>

                        {/* <Link type="submit" className="btn btn-success ms-3" to='signup'>SignUp Form</Link> */}
                    </form>



                </div>

            </div>
        </div>
    )
}

