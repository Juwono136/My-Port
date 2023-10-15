import React, { useEffect, useState } from 'react';
import Logo from '../assets/images/reset_password.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BounceLoader } from 'react-spinners';
import { reset, resetPassword } from '../features/auth/authSlice';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        password: '',
        confirm_password: ''
    })
    const { token } = useParams()
    const navigate = useNavigate()
    // console.log(token)

    const dispatch = useDispatch()
    const { password, confirm_password } = data
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            toast.success(user.message)

        }

        if (user.isLoggedOut === false) {
            navigate("/")
        }
    }, [user, isError, isSuccess, message, dispatch, navigate])

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, isError: '', isSuccess: '' })
    }

    const handleResetPassword = (e) => {
        e.preventDefault()

        const resetPass = {
            data,
            token
        }

        // console.log(resetPass)
        dispatch(resetPassword(resetPass))
        dispatch(reset())
        // setData({ password: '', confirm_password: '' })
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

            <div className='h-screen flex items-center justify-center text-white m-6'>
                <div className='flex flex-col-reverse bg-[#FF4949] rounded-2xl max-w-5xl shadow-lg p-5 md:flex-row md:p-10'>
                    {/* login form */}
                    <div className='flex-col items-center w-full md:w-1/2 md:pr-8'>
                        <div className='flex flex-col justify-center items-center pb-5 md:items-start'>
                            <h1 className='text-lg mb-2'>Reset Password</h1>
                            <p className='text-xs'>Please Reset your password for recorvery</p>
                        </div>

                        <form className='flex flex-col text-gray-800 mt-4' onSubmit={handleResetPassword}>
                            <div className='mb-5 relative'>
                                <input className='p-3 rounded-md text-sm outline-none w-full' type={`${showPassword ? "text" : "password"}`} placeholder='New Password' id='password' name='password' value={password} onChange={handleChangeInput} />
                                <i className={`${showPassword ? 'bx bxs-hide' : 'bx bxs-show'} absolute top-2 right-2 px-1 cursor-pointer text-xl text-gray-400 bg-white`} onClick={handleShowPassword}></i>
                            </div>

                            <div className='mb-5'>
                                <input className='p-3 rounded-md text-sm outline-none w-full' type={`${showPassword ? "text" : "password"}`} id='confirm_password' name='confirm_password' value={confirm_password} onChange={handleChangeInput} placeholder='Confirm Password' />
                            </div>

                            <div className='mb-5 text-white'>
                                <input className='bg-red-800 text-sm py-2 px-5 rounded-lg cursor-pointer transition ease-in-out duration-100 hover:bg-red-600' type='submit' value='Update Password' />
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

export default ResetPassword