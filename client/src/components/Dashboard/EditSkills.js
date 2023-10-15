import React, { useEffect, useState } from 'react';
import { Button, Card, IconButton, Tooltip, Typography } from '@material-tailwind/react'
import { Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { deleteUserSkill, getUserSkillInfo, reset } from '../../features/skill/skillSlice';
import { accessToken } from '../../features/token/tokenSlice';
import { toast } from 'react-toastify';
import Pagination from '../Pagination';
import SearchElement from '../SearchElement';

const EditSkills = () => {
    const YourSkillTableHead = ["No.", "Skill ID", "Skill Name", "Level", ""]
    const { skill, isLoading, isSuccess, isError, message } = useSelector((state) => state.skill)
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 6

    // handle search
    const handleSearch = (term) => {
        setSearchTerm(term);
        setSearchParams({ ...searchParams, search: term });
        setPage(1);
    }

    const startIndex = (page - 1) * itemsPerPage
    // const paginatedData = skill.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    // console.log(skill)

    const dispatch = useDispatch()

    // filter data base on search value
    const searchData = skill.filter(item =>
        item.skill_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.level.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const paginatedData = searchData.slice(startIndex, startIndex + itemsPerPage)

    const handleDeleteSkill = (e, id) => {
        e.preventDefault()

        dispatch(deleteUserSkill(id)).then(res => {
            dispatch(accessToken(res))
            setPage(1)
            setSearchParams({ page: 1, search: searchTerm })
        })
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }

        if (isSuccess) {
            toast.success(message)
            dispatch(getUserSkillInfo())
        }
        setSearchParams({ page, search: searchTerm }) // Update search params in URL
        setLoading(false)
    }, [isError, isSuccess, message, skill, setSearchParams, page, searchTerm, dispatch])

    if (loading || isLoading) {
        return (
            <div className='grid h-screen place-items-center'>
                <BounceLoader color="#ff0000" />
            </div>
        )
    }

    return (
        <div className='px-6 py-3'>
            <h3 className='text-xl font-bold text-gray-500 pointer-events-none sm:text-2xl'>Edit Skills</h3>

            <div className='px-3 py-2 w-full shadow-md shadow-gray-300 rounded-md'>
                <div>
                    <div className='flex flex-col md:flex-row md:items-center'>
                        <Link to="/skill/add">
                            <Button color='red' size='sm' className='flex items-center justify-center my-3 text-xs capitalize md:text-sm'>
                                <i className='bx bx-book-add mr-1'></i>
                                Add Skill
                            </Button>
                        </Link>

                        <SearchElement onSearch={handleSearch} />
                    </div>
                    <Card className="w-full md:h-[380px] h-[420px] overflow-y-hidden">
                        <table className='w-full min-w-max table-auto text-left'>
                            <thead className='sticky top-0 z-10'>
                                <tr>
                                    {YourSkillTableHead.map((head) => (
                                        <th key={head} className='border-b border-blue-gray-100 bg-red-100 p-4'>
                                            <Typography
                                                variant="small"
                                                className="text-red-800 font-semibold leading-none opacity-90"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody >
                                {/* skill have not set */}
                                {searchData.length === 0 && skill.length === 0 && (
                                    <tr>
                                        <td colSpan="5">
                                            <h4 className='p-3 text-sm text-red-700 font-medium'>You have not set any skills.</h4>
                                        </td>
                                    </tr>
                                )}

                                {/* data not found */}
                                {searchData.length === 0 && (
                                    <tr>
                                        <td colSpan="5">
                                            <h4 className='p-3 text-sm text-red-700 font-medium'>Skill not found.</h4>
                                        </td>
                                    </tr>
                                )}

                                {paginatedData.map((skill, index) => (
                                    <tr key={skill.id} className='even:bg-red-50'>

                                        <td className='p-4'>
                                            <Typography variant="small" className="font-normal text-red-800">
                                                {startIndex + index + 1}
                                            </Typography>
                                        </td>

                                        <td className='p-4'>
                                            <Typography variant="small" className="font-normal text-red-800">
                                                {skill.id}
                                            </Typography>
                                        </td>

                                        <td className='p-4'>
                                            <Typography variant="small" className="font-normal text-red-800">
                                                {skill.skill_name}
                                            </Typography>
                                        </td>

                                        <td className='p-4'>
                                            <Typography variant="small" className="font-normal text-red-500">
                                                {skill.level}
                                            </Typography>
                                        </td>

                                        <td className='px-4'>
                                            <Link to={`update/${skill.id}`} className='mr-2'>
                                                <Tooltip content="Edit">
                                                    <IconButton variant='text' color='red'>
                                                        <i className='bx bx-edit-alt text-green-500 md:text-xl text-lg'></i>
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>

                                            <Tooltip content="Delete">
                                                <IconButton variant='text' color='red' onClick={(e) => handleDeleteSkill(e, skill.id)}>
                                                    <i className='bx bx-trash text-red-800 md:text-xl text-lg'></i>
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <h4 className='p-3 text-sm text-red-700 font-medium'>You have not set any skills.</h4> */}
                    </Card>
                    <Pagination
                        data={searchData}
                        itemsPerPage={itemsPerPage}
                        page={page}
                        setPage={setPage}
                    />
                </div>
            </div>


        </div >
    )
}

export default EditSkills