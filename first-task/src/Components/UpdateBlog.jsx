import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getDataAPI, postDataAPI } from '../Api/Api'

const UpdateBlog = () => {
  const [blog, setBlog] = useState({
    title: '',
    details: ''
  })
  let { id } = useParams()


  useEffect(() => {
    getSingleBlog()
  }, [])

  const getSingleBlog = () => {
    getDataAPI(`blogs/getSingleData/${id}`).then((res) => setBlog(res.data))
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({
      ...prev, [name]: value
    }))
  }

  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    postDataAPI(`blogs/update/${id}`, { blog })
    navigate('/showblogs')
  }

  return (
    <div>

      <form className='m-5 p-5'>
        <h3 className='mb-3 text-secondary'>Update form</h3>
        <div className="mb-3">
          <label className="form-label fw-bold fs-4">Update Title</label>
          <input type="text" name='title' className="form-control" value={blog.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold fs-4">Update Details</label>
          <textarea type="text" name='details' className="form-control" rows="4" value={blog.details} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default UpdateBlog;