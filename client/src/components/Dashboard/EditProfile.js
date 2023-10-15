import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { getUserInfor, reset, updateUser } from '../../features/user/userSlice';
import { accessToken } from '../../features/token/tokenSlice';
import { convertFileToBase64 } from '../convertToBase64';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react';

const EditProfile = () => {
    const experiencesMenu = [
        "1 Year Working",
        "2 Years Working",
        "3 Years Working",
        "4 Years Working",
        "5+ Years Working"
    ]
    const supportsMenu = [
        "Everyday",
        "Weekday",
        "Weekend"
    ]
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user)
    const auth = useSelector((state) => state.auth.user)
    // const token = useSelector((state) => state.token)
    // console.log(auth)

    const initialState = {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        stack: user.stack,
        description: user.description,
        experience: user.experience,
        support: user.support
    }

    const [showPassword, setShowPassword] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [image, setImage] = useState(user.avatar)
    const [data, setData] = useState(initialState)
    const { name, stack, password, confirm_password, support, description, experience } = data

    const dispatch = useDispatch()

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, isError: '', isSuccess: '' })
    }

    const handleAvatar = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64Image = await convertFileToBase64(file);
                setImage(base64Image);
            } catch (error) {
                console.error('Error converting image:', error);
            }
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        const newData = { ...data, avatar: image };

        dispatch(updateUser(newData)).then(res => {
            dispatch(accessToken(res))
        })

        setOpenDialog(!openDialog)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }

        if (isSuccess) {
            toast.success(user.message)
            dispatch(getUserInfor({ ...data, avatar: image }))
        }

    }, [message, isError, isSuccess, dispatch, data, user, image])

    if (isLoading) {
        return (
            <div className='grid h-screen place-items-center'>
                <BounceLoader color="#ff0000" />
            </div>
        )
    }

    return (
        <div className='px-6 py-3'>
            <h3 className='text-xl font-bold text-gray-500 pointer-events-non sm:text-2xl'>Edit Profile</h3>
            {/* form profile */}
            <div className='flex flex-col items-start px-5 my-3 w-full shadow-md shadow-gray-300 rounded-md'>
                <form className='flex flex-col text-white mt-4 w-full md:flex-row' onSubmit={handleUpdate}>
                    <div className='basis-1/2 md:p-3'>
                        <div className='shrink-0'>
                            <img
                                className='h-20 w-20 object-cover rounded-full border-4 shadow-lg shadow-red-500/40 border-red-300 sm:h-32 sm:w-32'
                                src={image || user.avatar}
                                alt="avatar_profile"
                            />
                        </div>
                        <label className='block py-3 w-[100px]'>
                            <span className='sr-only'>Choose profile photo</span>
                            <input
                                type="file"
                                accept=".jpeg, .png, .jpg"
                                name='avatar'
                                className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-3
                                file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-100 file:text-red-800 hover:file:bg-red-200 file:cursor-pointer'
                                onChange={handleAvatar} autoComplete='off'
                            />
                        </label>

                        <div className='mb-3'>
                            <label htmlFor='name' className='text-red-800 text-xs md:text-sm'>Name <span className='text-red-600'>*</span></label>
                            <input className='p-3 rounded-md outline-none text-xs md:text-sm w-full font-medium bg-red-400 placeholder:text-white' type="text" name='name' id='name' onChange={handleChange} value={name} placeholder={user.name} autoComplete='off' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='email' className='text-red-800 text-xs md:text-sm'>Email <span className='text-red-600'>*</span></label>
                            <input className='p-3 rounded-md outline-none text-xs md:text-sm w-full font-medium bg-red-200 placeholder:text-white cursor-not-allowed' type="email" name='email' id='email' placeholder={auth.email} disabled autoComplete='off' />
                        </div>

                        <div className='mb-3 mt-5'>
                            <h3 className='text-xs text-red-500 italic underline'>Attention:</h3>
                            <p className='text-xs text-red-300'>Changing the password here will automatically update your password when you log in!</p>
                        </div>

                        <div className='mb-3 relative'>
                            <label htmlFor='password' className='text-red-800 text-xs md:text-sm'>Password</label>
                            <input className='p-3 rounded-md outline-none text-xs md:text-sm w-full font-medium bg-red-400 placeholder:text-white' type={`${showPassword ? "text" : "password"}`} placeholder='Password' id='password' name='password' value={password} onChange={handleChange} />
                            <i className={`${showPassword ? 'bx bxs-hide' : 'bx bxs-show'} absolute top-10 right-2 px-1 cursor-pointer text-xl text-white`} onClick={handleShowPassword}></i>
                        </div>

                        <div className='mb-3 relative'>
                            <label htmlFor='confirm_password' className='text-red-800 text-xs md:text-sm'>Confirm Password</label>
                            <input className='p-3 rounded-md outline-none text-xs md:text-sm w-full font-medium bg-red-400 placeholder:text-white' type={`${showPassword ? "text" : "password"}`} placeholder='Confirm Password' id='confirm_password' name='confirm_password' value={confirm_password} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='text-white w-full basis-1/2 md:p-3'>
                        <div className='mb-3'>
                            <label htmlFor='stack' className='text-red-800 text-xs md:text-sm'>Stack</label>
                            <input className='p-3 rounded-md outline-none text-xs md:text-sm w-full font-medium bg-red-400 placeholder:text-white' type="text" name='stack' id='stack' onChange={handleChange} value={stack} placeholder={user.stack} autoComplete='off' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="description" className='text-red-800 text-xs md:text-sm'>Description</label>
                            <textarea name="description" id="description" cols="30" rows="6" className='p-3 rounded-md outline-none text-xs md:text-sm w-full font-medium bg-red-400 placeholder:text-white resize-none' onChange={handleChange} value={description} placeholder={user.description}></textarea>
                        </div>

                        <div className='mb-5 '>
                            <label htmlFor="select" className="block text-sm font-medium text-red-800">
                                Experience
                            </label>
                            <div className="mt-1 relative">
                                <select
                                    id="experience"
                                    name="experience"
                                    value={experience}
                                    className="block w-full py-2 pl-3 pr-8 text-xs text-red-400 border-gray-100 focus:outline-none focus:ring-red-500 focus:border-red-500 md:text-md rounded-md appearance-none" onChange={handleChange} onClick={() => setDropDown(!dropDown)}
                                >
                                    <option hidden defaultValue={experience}>{user.experience}</option>
                                    {experiencesMenu.map((experience) => (
                                        <option key={experience} value={experience}>
                                            {experience}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <i className={`${dropDown ? 'bx bx-chevron-up' : 'bx bx-chevron-down'} text-red-300 text-sm md:text-md`}></i>
                                </div>
                            </div>
                        </div>

                        <div className='mb-5'>
                            <label htmlFor="select" className="block text-sm font-medium text-red-800">
                                Support
                            </label>
                            <div className="mt-1 relative">
                                <select
                                    id="support"
                                    name="support"
                                    value={support}
                                    className="block w-full py-2 pl-3 pr-8 text-xs text-red-400 border-gray-100 focus:outline-none focus:ring-red-500 focus:border-red-500 md:text-md rounded-md appearance-none" onChange={handleChange} onClick={() => setDropDown(!dropDown)}
                                >
                                    <option hidden defaultValue={support}>{user.support}</option>
                                    {supportsMenu.map((support) => (
                                        <option key={support} value={support}>
                                            {support}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <i className={`${dropDown ? 'bx bx-chevron-up' : 'bx bx-chevron-down'} text-red-300 text-sm md:text-md`}></i>
                                </div>
                            </div>
                        </div>

                        <div className='my-5 text-white'>
                            <Button
                                className='bg-red-800 hover:bg-red-600 text-sm py-2 px-5 rounded-lg capitalize'
                                onClick={handleOpenDialog}
                                color='red'
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </form>

                {/* Dialog save button */}
                <Dialog open={openDialog} handler={handleOpenDialog}>
                    <DialogHeader>
                        <Typography variant="h5" color="blue-gray">
                            Attention is Required!
                        </Typography>
                    </DialogHeader>

                    <DialogBody divider className='grid place-items-center gap-4'>
                        <i className='bx bxs-user text-4xl text-red-900'></i>
                        <Typography color="red" variant="h4">
                            Save user profile?
                        </Typography>
                    </DialogBody>

                    <DialogFooter className='space-x-2'>
                        <Button variant="text" color="blue-gray" onClick={handleOpenDialog}>
                            Cancel
                        </Button>
                        <Button variant='gradient' color='red' onClick={handleUpdate} type='submit'>
                            Save
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
        </div>
    )
}

export default EditProfile