import React, { useState } from 'react'
import OnigirokuLogo from '../../assets/images/onigiroku-logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react';

const SidebarDashboard = () => {
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const menus = [
        { title: "Dashboard", icon: "bx bx-home", link: "/dashboard" },
        { title: "Profile", icon: "bx bx-user", link: "/profile" },
        { title: "Skills", icon: "bx bx-book", link: "/skill" },
        { title: "Portfolio", icon: "bx bx-briefcase-alt-2", link: "/portfolio" },
        { title: "Resume", icon: "bx bx-receipt", link: "/resume" },
    ]

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog)
    }

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
        navigate('/auth')
        dispatch(reset())
    }

    return (
        <div className={`${open ? 'w-60' : 'w-20'} p-5 pt-8 duration-200 h-screen bg-red-100 shadow-2xl fixed z-50`}>
            <i className={`bx ${open ? 'bx-chevron-left' : 'bx-chevron-right'} transition-all absolute cursor-pointer -right-4 top-9 p-2 rounded-full text-red-800 border-2 border-red-800 bg-white hover:bg-red-200`}
                onClick={() => setOpen(!open)}></i>

            <Link className='flex gap-x-4 items-center' to='/dashboard'>
                <img src={OnigirokuLogo} alt="sidebar-logo" className={`cursor-pointer duration-300 w-10 ${open && 'rotate-[360deg]'}`} />
                <h1 className={`text-gray-900 origin-left font-bold text-xl duration-300 ${!open && 'scale-0'}`}>My_Port</h1>
            </Link>

            <ul className='pt-6'>
                {menus.map((menu, index) => (
                    <li key={index} className="flex text-md font-medium items-center gap-x-4 p-2 rounded-md hover:bg-white cursor-pointer">
                        <NavLink className={`flex items-center text-red-900`} to={menu.link}>
                            <i className={`${menu.icon} text-center px-0.5 text-xl`}></i>
                            <span className={`${!open && 'hidden'} duration-500 pl-2`}>{menu.title}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>

            <Button className='flex items-center mt-5 p-2 w-full text-white text-sm rounded-md' color='red' onClick={handleOpenDialog}>
                <i className='bx bx-log-out text-xl'></i>
                <span className={`${!open && 'hidden'} pl-3`}>Logout</span>
            </Button>

            {/* Dialog logout button */}
            <Dialog open={openDialog} handler={handleOpenDialog}>
                <DialogHeader>
                    <Typography variant="h5" color="blue-gray">
                        Attention is Required!
                    </Typography>
                </DialogHeader>

                <DialogBody divider className='grid place-items-center gap-4'>
                    <i className='bx bxs-bell text-4xl text-red-900'></i>
                    <Typography color="red" variant="h4">
                        You want to logout?
                    </Typography>
                </DialogBody>

                <DialogFooter className='space-x-2'>
                    <Button variant='text' color='blue-gray' onClick={handleOpenDialog}>
                        Back
                    </Button>
                    <Button variant='gradient' color='red' onClick={handleLogout}>
                        Logout
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default SidebarDashboard