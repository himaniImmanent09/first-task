import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { postDataAPI } from '../Api/Api';


export default function SignUp() {
    const [err, setErr] = useState('')
    const [message, setMessage] = useState('')
    const [formData, setFormdata] = useState({
        username: '',
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
        // console.log(formData)
        postDataAPI("signup", {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        })
            .then(function (res) {
                if (res.data.success === true) {
                    // console.log(res.data.message)
                    setMessage(res.data.message)
                    setTimeout(() => {
                        setMessage('')
                        navigate('/')
                    }, 2000);

                }
                else {
                    console.log(res.data)
                    setErr(res.data.errors)
                    // alert("check credentitials");
                }

            })
            .catch(function () {
                alert("Could not creat account. Please try again");
            });
    }


    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-5">
                    <h3>SignUp Form</h3>
                    <form className='shadow p-4' onSubmit={handleSubmit}>
                        <div className="mt-1">
                            <label className="form-label ms-0">UserName</label>
                            <input type="text" className="form-control"
                                name='username'
                                onChange={handleChange} />

                        </div>
                        <span className='text-danger'>{err.username ? err.username : ""}</span>
                        <div className="mt-3">
                            <label className="form-label ms-0">Email address</label>
                            <input type="email" className="form-control"
                                name='email'
                                onChange={handleChange} />

                        </div>
                        <p className='text-danger'>{err.email ? err.email : ""}</p>
                        <div className="mt-3">
                            <label className="form-label">Password</label>
                            <input type="password"
                                name='password'
                                className="form-control"
                                onChange={handleChange} />
                        </div>
                        <p className='text-danger'>{err.password ? err.password : ""}</p>

                        <button type="submit" className="btn btn-primary">Submit</button>

                        <p className='text-success'>{message ? message : ""}</p>

                        {/* <Link type="submit" className="btn btn-success ms-3" to='/'>SignIn Form</Link> */}
                    </form>

                </div>
            </div>
        </div>
    )
}

