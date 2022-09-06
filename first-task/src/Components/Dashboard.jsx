import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from '@mui/material/Modal';
import { deleteDataAPI, getDataAPI } from '../Api/Api'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  boxShadow: 24,
};


const Dashboard = () => {
  const [data, setData] = useState([])
  const [id, setId] = useState()
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("")
  const [user, setUser] = useState()
  const handleOpen = (id) => {
    setId(id)
    setOpen(true);
  }


  useEffect(() => {
    getUser();
  }, [])


  async function getUser() {
    getDataAPI("user/refresh_token").then(function (token) {
      if (token.data.accesstoken) {
        getDataAPI(
          `get_user/${token.data.id}`,
          token.data.accesstoken
        ).then((res) => {
          setUser(res.data);
        });
      }
    });
  }



  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    deleteDataAPI(`delete/${id}`).then((res) => setMessage(res.data)).then(() => setTimeout(() => {
      setMessage('')
    }, 2000))
    handleClose()
  }
  useEffect(() => {
    getDataAPI('users').then((res) => setData(res.data))
  }, [message])

  return (
    <>


      <div className='container mt-5'>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              {/* <th scope="col">Password</th> */}
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
                    {/* <td>{item.password}</td> */}
                    <td className='d-flex'>

                      <button className='btn btn-danger' onClick={() => handleOpen(item._id)}>Delete</button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <div className='modal-modify shadow rounded' style={style}>
                          <h4 className='m-3'>
                            Are you sure you want to delete..?
                          </h4>
                          <button onClick={handleDelete} className='btn btn-danger ms-3 mb-3'>Yes</button>
                          <button onClick={handleClose} className='btn btn-primary ms-3 mb-3'>No</button>

                        </div>
                      </Modal>

                      <Link className='btn btn-info ms-3' to={`/dashboard/update/${item._id}`}>Update</Link></td>
                  </tr>
                )
              }) : []
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Dashboard