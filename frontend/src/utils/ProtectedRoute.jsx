import React, { useContext } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = () => {
    const isLoggedin = useContext(AuthContext)
    console.log(isLoggedin)
    return isLoggedin ? <Outlet /> : <Navigate to="/login" replace/> 
}

export default ProtectedRoute
