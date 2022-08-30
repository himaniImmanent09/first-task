import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [message, setMessage] = useState()

  useEffect(() => {
    axios.get('/users').then((res) => setData(res.data))
  }, [message])

  const handleDelete = (id) => {
    axios.delete(`/delete/${id}`).then((res) => setMessage(res.data.msg)
    ).then(() => setTimeout(() => {
      setMessage("")
    }, 2000))
  }

  return (
    <div className='container mt-5'>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>

          {
            data.length > 0 ? data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td><button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                    <Link className='btn btn-info ms-3' to={`/update/${item._id}`}>Update</Link></td>
                </tr>
              )
            }) : []
          }

        </tbody>
      </table>
    </div>
  )
}

export default Dashboard