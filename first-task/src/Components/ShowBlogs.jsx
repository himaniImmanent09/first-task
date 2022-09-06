import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteDataAPI, getDataAPI } from '../Api/Api';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  boxShadow: 24,
};


const ShowBlogs = () => {
  const [data, setData] = useState([])
  const [id, setId] = useState()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [user, setUser] = useState();


  const handleOpen = (id) => {
    setId(id)
    setOpen(true);
  }

 

  useEffect(() => {
    getDataAPI('user/refresh_token').then(function (token) {
      if (token.data.user._id) {
        getDataAPI(`get_user/${token.data.user._id}`, token.data.access_token)
          .then((res) => setUser(res.data.user._id))
      }
    });

  }, []);

  // console.log(user)

  const getblogs = (user) => {
    if (user) {
      getDataAPI(`blogs/getdata/${user}`).then((res) => setData(res.data))
    }
  }

  useEffect(() => {
    if (user) {
      getblogs(user)
    }
  }, [user, message])



  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    deleteDataAPI(`blogs/delete/${id}`).then((res) => setMessage(res.data)).then(() => setTimeout(() => {
      setMessage('')
    }, 2000))
    handleClose()
  }


  return (
    <div>

      <Link className='btn btn-success m-4' to='/dashboard/postform'>Create Blog</Link>

      {data.length > 0 ? data.map((item, index) => {
        return (
          <div className="conatiner m-3" key={index}>
            <div className="card">
              <div className="d-flex">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.details}</p>
                </div>
                <div className='d-flex mt-3'>
                  <Link to={`/dashboard/updateblog/${item._id}`}><FiEdit className='fs-4' /></Link>
                  <AiFillDelete className='fs-4' style={{ cursor: 'pointer' }} onClick={() => handleOpen(item._id)} />

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

                </div>
              </div>
            </div>
          </div>
        )
      }) : []}




    </div>
  )
}

export default ShowBlogs;