import React from 'react'
import { useSelector } from 'react-redux';

const NavbarDashboard = () => {
    const { user } = useSelector((state) => state.user)
    // console.log(user)

    return (
        <div>
            {/* Navbar Section */}
            <div className='flex justify-between items-center bg-white shadow-md w-full py-3 px-8' >
                <div>
                    <h3 className='font-bold text-red-700 pointer-events-none'>My_Port</h3>
                </div>

                {/* search button */}
                {/* <form className='flex items-center'>
                    <label htmlFor="nav-seacrh" className='sr-only'>Search</label>
                    <div className='relative w-full'>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <i className='bx bx-search text-base text-gray-500'></i>
                        </div>
                        <input type="text" id='nav-search' className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-9 p-2' placeholder='Search...' />
                    </div>
                    <button type='submit' className='p-2.5 ml-2 text-xs font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300'>
                        Search
                    </button>
                </form> */}

                <div className='hidden items-center pointer-events-none sm:flex'>
                    <img src={user.avatar} alt="logo" className='w-10 rounded-full object-cover text-xs' />
                    <span className='text-sm p-2 text-gray-500'>{user.name}</span>
                </div>
            </div>
        </div>
    )
}

export default NavbarDashboard