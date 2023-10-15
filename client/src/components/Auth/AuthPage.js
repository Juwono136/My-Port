import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginImg from '../../assets/images/login-page.png';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { reset, signin } from '../../features/auth/authSlice';

const AuthPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        isError: "",
        isSuccess: ""
    })

    const { email, password } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            toast.success(user.message)
            navigate('/dashboard')
            // dispatch(reset())
        }

        if (user.isLoggedOut === false) {
            navigate("/dashboard")
        }

        if (user.isLoggedOut) {
            toast.info(user.message)
            // navigate('/auth')
            // dispatch(reset())
        }
        // dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value, isError: '', isSuccess: '' })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(signin(userData))
        // navigate('/dashboard')
        dispatch(reset())
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
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
            <a href="/" className='fixed left-6 bg-red-500 text-white px-4 py-2 rounded-md transition ease-in-out duration-200 hover:bg-red-800'>
                <i className='relative top-0.5 bx bx-arrow-back'></i> Back
            </a>

            <div className='min-h-screen flex items-center justify-center text-white m-6'>
                <div className='flex flex-col-reverse bg-[#FF4949] rounded-2xl max-w-5xl shadow-lg p-5 md:flex-row md:p-10'>
                    {/* login form */}
                    <div className='flex-col items-center w-full md:w-1/2 md:pr-8'>
                        <div className='flex flex-col justify-center items-center pb-5 md:items-start'>
                            <h1 className='text-lg mb-2'>Login</h1>
                            <p className='text-xs'>Please login with your account</p>
                        </div>

                        <form onSubmit={onSubmit} className='flex flex-col text-gray-800 mt-4'>
                            <div className='mb-5'>
                                <input className='p-3 rounded-md text-sm outline-none w-full' type="email" id='email' name='email' value={email} onChange={onChange} placeholder='Email' />
                            </div>

                            <div className='mb-5 relative'>
                                <input className='p-3 rounded-md text-sm outline-none w-full' type={`${showPassword ? "text" : "password"}`} placeholder='Password' id='password' name='password' value={password} onChange={onChange} />
                                <i className={`${showPassword ? 'bx bxs-hide' : 'bx bxs-show'} absolute top-2 right-2 px-1 cursor-pointer text-xl text-gray-400 bg-white`} onClick={handleShowPassword}></i>
                            </div>

                            <div className='mb-5 text-white'>
                                <input className='bg-red-800 text-sm py-2 px-5 rounded-lg cursor-pointer transition ease-in-out duration-100 hover:bg-red-600' type="submit" value="Login" />
                            </div>
                        </form>

                        {/* <div className='mt-4 grid grid-cols-3 items-center text-white'>
                            <hr className='border-white' />
                            <p className='text-center text-sm'>OR</p>
                            <hr className='border-white' />
                        </div>

                        <button className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm font-semibold hover:scale-105 duration-300 text-[#FF4949]'>
                            <i className='bx bxl-google mr-3 text-lg' ></i>
                            Login with Google
                        </button> */}

                        <div className='mt-3 text-xs py-3 text-white hover:underline'>
                            <a href='/forgot'>Forgot your password?</a>
                        </div>
                    </div>

                    {/* image login form */}
                    <div className='m-auto w-full bg-red-800 p-10 mb-5 rounded-2xl md:w-1/2'>
                        <img className='drop-shadow-lg' src={LoginImg} alt="login-img" />
                    </div>
                </div>
            </div >
        </>

    )

}

export default AuthPage