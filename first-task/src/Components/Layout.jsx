import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import Dashboard from './Dashboard';
import UpdateForm from './UpdateForm';
import PostForm from './PostForm';
import ShowBlogs from './ShowBlogs';
import UpdateBlog from './UpdateBlog';
import ShowAllBlogs from './ShowAllBlogs';
import { getDataAPI } from '../Api/Api';

const Layout = () => {

    let navigate = useNavigate()

    useEffect(() => {
        getDataAPI('user/refresh_token').then(function (res) {
            if (res.data.status === 0) {
                navigate('/signin')
            }
        })
    }, [])



    return (
        <>
            <Routes>
                <Route path='/users' element={<Dashboard />}></Route>
                <Route path='/update/:id' element={<UpdateForm />}></Route>
                <Route path='/postform' element={<PostForm />}></Route>
                <Route path='/myblogs' element={<ShowBlogs />}></Route>
                <Route path='/showblogs' element={<ShowAllBlogs />}></Route>
                <Route path='/updateblog/:id' element={<UpdateBlog />}></Route>
            </Routes>
        </>
    )
}

export default Layout