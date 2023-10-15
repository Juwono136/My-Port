import React, { useEffect } from 'react'
import SidebarDashboard from '../components/Dashboard/SidebarDashboard';
import NavbarDashboard from '../components/Dashboard/NavbarDashboard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
    const { user } = useSelector((state) => state.auth)
    // const token = useSelector((state) => state.token.value)
    // console.log(token)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.isLoggedOut) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <>
            <div className='flex'>
                <SidebarDashboard />
                <div className='pl-[5rem] text-2xl font-semibold flex-1 h-screen w-full absolute z-10'>
                    <NavbarDashboard />
                    <main>{children}</main>
                </div>
            </div>
        </>
    )

}

export default Layout