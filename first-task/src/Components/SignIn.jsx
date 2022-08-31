import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignIn() {
    const[err, setErr] = useState('')
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
            .then(function(res) {
                console.log(res)
                if(res.data.status === 1) {
                    navigate("/dashboard")
                }else(
                    setErr(res.data.errors)
                )
            })
    }

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-5">
                    <h3>SignIn Form</h3>
                    <form className='shadow p-4' >
                        <div className="mt-3">
                            <label className="form-label ms-0">Email address</label>
                            <input type="email" className="form-control"
                                name='email'
                                value={formData.email}
                                onChange={handleChange} />

                        </div>
                        <p className='text-danger'>{err.email? err.email:""}</p>
                        <div className="mt-3">
                            <label className="form-label">Password</label>
                            <input type="password"
                                name='password'
                                value={formData.password}
                                className="form-control"
                                onChange={handleChange} />
                        </div>
                        <p className='text-danger'>{err.password? err.password:""}</p>
                        <button onClick={handleSubmit} className='btn btn-primary'>Login</button>

                        {/* <Link type="submit" className="btn btn-success ms-3" to='signup'>SignUp Form</Link> */}
                    </form>



                </div>

            </div>
        </div>
    )
}

