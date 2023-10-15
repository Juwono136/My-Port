import React, { useEffect, useRef, useState } from 'react'

const SearchElement = ({ onSearch, darkMode }) => {
    const [searchValue, setSearchValue] = useState("")
    const inputRef = useRef(null)

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchValue(value)
        onSearch(value)
    }

    const handleClearSearch = () => {
        setSearchValue("")
        onSearch("")
    }

    const handlePreventEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // prevenet default behavior from "Enter" button
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault()
                inputRef.current.focus()
            }

            if (e.key === "Escape") {
                e.preventDefault()
                inputRef.current.blur()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <div className={`my-2 md:m-3 ${darkMode ? 'dark' : ''}`}>
            {/* search button */}
            <form className='flex items-center'>
                <label htmlFor="skill_search" className='sr-only'>Search</label>
                <div className='relative w-full md:w-[400px] '>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className='bx bx-search text-base text-gray-500'></i>
                    </div>
                    <input type="text" id='skill_search' className='text-xs bg-gray-50 border border-gray-300 text-gray-600 rounded-lg focus:ring-red-500 focus:border-red-600 block w-full pl-9 p-2 placeholder:text-xs placeholder:md:text-sm md:text-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500' value={searchValue} onChange={handleSearchChange} onKeyDown={handlePreventEnter} ref={inputRef} placeholder="Search or Press [Ctrl + K]" autoComplete='off' />

                    {searchValue && (
                        <button
                            type='button'
                            className="absolute inset-y-0 right-0 flex items-center m-1 px-1.5 bg-gray-50 text-gray-600 text-lg rounded-full focus:outline-none hover:text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                            onClick={handleClearSearch}
                        >
                            <i className='bx bx-x'></i>
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default SearchElement