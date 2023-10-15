import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import Logo from '../assets/images/onigiroku-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { BounceLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { email } = data
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            toast.success(user.message)
            // navigate('/auth')
        }

        if (user.isLoggedOut === false) {
            navigate("/")
        }
    }, [user, isError, isSuccess, message, dispatch, navigate])

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, isError: '', isSuccess: '' })
    }

    const handleForgotPass = (e) => {
        e.preventDefault()

        const userEmail = {
            email
        }

        dispatch(forgotPassword(userEmail))
        setData({ email: '' })
        dispatch(reset())
        // navigate("/auth")

    }

    if (isLoading) {
        return (
            <div className='grid h-screen place-items-center'>
                <BounceLoader color="#ff0000" />
            </div>
        )
    }

    return (
        <>
            {/* back to home button */}
            <a href="/auth" className='fixed left-6 bg-red-500 text-white px-4 py-2 rounded-md transition ease-in-out duration-200 hover:bg-red-800'>
                <i className='relative top-0.5 bx bx-arrow-back'></i> Back
            </a>
            <div className='h-screen flex flex-col items-center justify-center text-white m-6'>
                <div className='flex flex-col-reverse bg-[#FF4949] rounded-2xl max-w-5xl shadow-lg p-5 md:flex-row md:p-10'>
                    {/* login form */}
                    <div className='flex-col items-center w-full md:w-1/2 md:pr-8'>
                        <div className='flex flex-col justify-center items-center pb-5 md:items-start'>
                            <h1 className='text-lg mb-2'>Forgot Password?</h1>
                            <p className='text-xs'>Please verify your email</p>
                        </div>

                        <form className='flex flex-col text-gray-800 mt-4' onSubmit={handleForgotPass}>
                            <div className='mb-5'>
                                <input className='p-3 rounded-md text-sm outline-none w-full' type="email" id='email' name='email' value={email} onChange={handleChangeInput} placeholder='Email' />
                            </div>

                            <div className='mb-5 text-white'>
                                <input className='bg-red-800 text-sm py-2 px-5 rounded-lg cursor-pointer transition ease-in-out duration-100 hover:bg-red-600' type='submit' value="Verify your email" />
                            </div>
                        </form>

                    </div>

                    {/* image login form */}
                    <div className='flex items-center justify-center m-auto w-full bg-red-700 p-10 mb-5 rounded-2xl md:w-1/2'>
                        <img className='drop-shadow-lg w-1/2' src={Logo} alt="login-img" />
                    </div>
                </div>
            </div >
        </>
    )
}

export default ForgotPassword