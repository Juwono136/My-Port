import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout'
import { Button } from '@material-tailwind/react';
import UseDocumentTitle from '../components/utils/useDocumentTitle/UseDocumentTitle';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createUserSkill, getUserSkillInfo, reset } from '../features/skill/skillSlice';
import { BounceLoader } from 'react-spinners';
import { accessToken } from '../features/token/tokenSlice';

const AddSkill = () => {
    UseDocumentTitle("Add Skill")
    const levelOption = [
        "Basic",
        "Intermediate",
        "Advanced"
    ]

    const initialState = {
        skill_name: "",
        level: "Basic"
    }

    const { skill, isLoading, isSuccess, isError, message } = useSelector((state) => state.skill)
    const [dropDown, setDropDown] = useState(false)
    const [data, setData] = useState(initialState)
    const { skill_name, level } = data
    // console.log(data)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, isError: "", isSuccess: "" })
    }

    const handleCreateSkill = (e) => {
        e.preventDefault()

        const addData = { ...data }
        // console.log(addData)

        dispatch(createUserSkill(addData)).then(res => {
            dispatch(accessToken(res))
        })
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
            navigate("/skill/add")
        }

        if (isSuccess) {
            toast.success(message)
            dispatch(getUserSkillInfo())
            navigate("/skill")

        }
    }, [isError, isSuccess, message, skill, dispatch, navigate])

    if (isLoading) {
        return (
            <div className='grid h-screen place-items-center'>
                <BounceLoader color="#ff0000" />
            </div>
        )
    }

    return (
        <Layout>
            <div className='px-6 py-3'>
                <div className='flex items-center'>
                    <Link to="/skill">
                        <Button className='flex items-center justify-center my-3 capitalize' color='red' size='sm'>
                            <i className='bx bx-arrow-back mr-1'></i>
                            Back
                        </Button>
                    </Link>
                </div>
                <h3 className='text-xl font-bold text-gray-500 pointer-events-non sm:text-2xl'>Add Skill</h3>

                <div className='px-3 w-full shadow-md shadow-gray-300 rounded-md'>
                    <form className="flex flex-col px-3 py-2 text-white mt-4 w-full">
                        <div className="w-full md:w-1/2 mb-3">
                            <label htmlFor="skill_name" className="text-red-800 text-xs md:text-sm">
                                Skill Name:
                            </label>
                            <input className='p-3 rounded-md outline-none text-xs md:text-sm w-full font-medium bg-red-500 placeholder:text-gray-200' type="text" name='skill_name' value={skill_name} onChange={handleChange} id='skill_name' placeholder="Write your skill..." autoComplete='off' />
                        </div>

                        <div className='mb-5'>
                            <label htmlFor="select" className="block text-sm font-semibold text-red-800">
                                Level:
                            </label>
                            <div className="mt-1 w-full relative md:w-1/2">
                                <select
                                    id="level"
                                    name="level"
                                    value={level}
                                    className="block w-full py-2 pl-3 pr-8 text-xs text-red-400 border-gray-100 focus:outline-none focus:ring-red-500 focus:border-red-500 md:text-md rounded-md appearance-none" onChange={handleChange} onClick={() => setDropDown(!dropDown)}
                                >
                                    <option hidden defaultValue={level}>{level}</option>
                                    {levelOption.map((levelOption) => (
                                        <option key={levelOption} value={levelOption}>
                                            {levelOption}
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
                                onClick={handleCreateSkill}
                                color='red' type='submit'
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default AddSkill