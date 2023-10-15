import React, { useEffect, useState } from 'react';
import { Button, Tooltip } from '@material-tailwind/react'
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserPortfolio, reset } from '../../features/portfolio/portfolioSlice';
import { BounceLoader } from 'react-spinners';
import Pagination from '../Pagination';
import SearchElement from '../SearchElement';

const EditPortfolio = () => {
    const { portfolio, isLoading, isSuccess, isError, message } = useSelector((state) => state.portfolio)
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 6
    const dispatch = useDispatch()

    // console.log(portfolio)

    // handle search
    const handleSearch = (term) => {
        setSearchTerm(term);
        setSearchParams({ ...searchParams, search: term });
        setPage(1);
    }

    const startIndex = (page - 1) * itemsPerPage

    // sorted data based on recently added data
    const sortedData = [...portfolio].sort((a, b) => {
        return b.id.localeCompare(a.id)
    })

    // filter data base on search value
    const searchData = sortedData.filter(item =>
        item.project_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    )

    const paginatedData = searchData.slice(startIndex, startIndex + itemsPerPage)

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }

        if (isSuccess) {
            toast.success(message)
            dispatch(getUserPortfolio())
        }

        setSearchParams({ page, search: searchTerm }) // Update search params in URL
        setLoading(false)
    }, [isError, isSuccess, message, portfolio, setSearchParams, page, searchTerm, dispatch])

    if (loading || isLoading) {
        return (
            <div className='grid h-screen place-items-center'>
                <BounceLoader color="#ff0000" />
            </div>
        )
    }

    return (
        <div className='px-6 py-3 overflow-hidden'>
            <h3 className='text-xl font-bold text-gray-500 pointer-events-none sm:text-2xl'>Edit Portfolio</h3>

            <div className='flex flex-col pb-2 md:items-center md:flex-row'>
                <Link to="/portfolio/add">
                    <Button color='red' size='sm' className='flex items-center justify-center my-3 mr-2 text-xs capitalize md:text-sm'>
                        <i className='bx bx-briefcase-alt mr-1'></i>
                        Add Portfolio
                    </Button>
                </Link>

                <SearchElement onSearch={handleSearch} />
            </div>
            <h2 className='text-gray-600 font-semibold text-sm pb-2'>Total of Portfolio: <span>{portfolio.length}</span></h2>

            <div className='grid grid-cols-1 gap-2 p-1 w-full shadow-md shadow-gray-300 rounded-md md:py-3 md:grid-cols-2 lg:grid-cols-3'>
                {/* skill have not set */}
                {searchData.length === 0 && portfolio.length === 0 && (
                    <h4 className='p-3 text-sm text-red-700 font-medium'>You have not set any portfolios.</h4>
                )}

                {/* data not found */}
                {searchData.length === 0 && (
                    <h4 className='p-3 text-sm text-red-700 font-medium'>Portfolio not found.</h4>
                )}

                {paginatedData.map((portfolio) => (
                    <div className='p-3 m-3 shadow-lg rounded-lg' key={portfolio.id}>
                        <div>
                            <img src={portfolio.project_image} alt="portfolio" className='rounded-xl object-cover shadow-lg' />
                            <h3 className='py-2 text-sm break-words font-semibold md:text-lg text-gray-800'>{portfolio.project_title}</h3>

                            {/* <div className='text-gray-600 text-xs pb-2' dangerouslySetInnerHTML={{ __html: portfolio.project_desc }}>
                            </div> */}

                            {portfolio.tags.map((tag, index) => (
                                <div key={index} className='inline-block p-2 my-1 mr-1.5 bg-red-100 rounded-lg cursor-pointer hover:bg-red-200'>
                                    <p className='text-xs text-red-600 font-base'>{tag}</p>
                                </div>
                            ))}

                        </div>
                        <div className='mt-2'>
                            <a href={portfolio.project_link} target='_blank' rel='noreferrer'>
                                <Tooltip content="Link Project" className="text-xs bg-yellow-900">
                                    <Button size='sm' className='py-1 px-2 mr-2 bg-yellow-900 shadow-sm shadow-yellow-500 hover:shadow-yellow-700 hover:shadow-md'>
                                        <i className='bx bx-link-alt text-sm font-base text-white'></i>
                                    </Button>
                                </Tooltip>
                            </a>
                            <Link to={`update/${portfolio.id}`}>
                                <Button color='green' size='sm' className='text-xs font-medium py-1 px-3 capitalize'>
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                data={searchData}
                itemsPerPage={itemsPerPage}
                page={page}
                setPage={setPage}
            />
        </div >
    )
}

export default EditPortfolio