import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { setMessage, setUser, setVariant } from '../../redux/authSlice';

const TokenValidate = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const checkToken = () => {
            const token = Cookies.get('token')  
            if (!token) {
                navigate('/');
                dispatch(setMessage('Session Expired'))
                dispatch(setVariant('danger'))
                dispatch(setUser(null))
            }
        }
        checkToken()

        const interval = setInterval(checkToken, 1000);
        return () => clearInterval(interval)
    }, [navigate, dispatch])

    return (
        <>
            {children}
        </>
    )
}

export default TokenValidate