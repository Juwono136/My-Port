import { Button, IconButton } from '@material-tailwind/react';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Pagination = ({ data, itemsPerPage, page, setPage }) => {
    const totalPages = Math.ceil(data.length / itemsPerPage)

    const handleNextPage = () => {
        if (page === totalPages) return
        setPage(page + 1)
    }

    const handlePrevPage = () => {
        if (page === 1) return
        setPage(page - 1)
    }

    // get search params from URL
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const searchTerm = searchParams.get('search') || ""

    return (
        <div className='flex items-center justify-center mt-3'>
            <Button
                variant="text"
                color='red'
                className="flex items-center gap-1 px-2 capitalize"
                onClick={handlePrevPage}
                disabled={page === 1}
            >
                Prev
            </Button>
            <div className='flex items-center gap-2'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                    <Link to={`?page=${num}&search=${searchTerm}`} key={num}>
                        <IconButton
                            variant={num === page ? "filled" : "text"}
                            onClick={() => setPage(num)}
                            color='red'
                        >
                            {num}
                        </IconButton>
                    </Link>
                ))}
            </div>
            <Button
                variant="text"
                color='red'
                className="flex items-center gap-1 px-2 capitalize"
                onClick={handleNextPage}
                disabled={page === totalPages}
            >
                Next
            </Button>
        </div>
    )
}

export default Pagination