import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import UseDocumentTitle from '../components/utils/useDocumentTitle/UseDocumentTitle'
import { useDispatch, useSelector } from 'react-redux'
import { BounceLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { getUserSkillInfo, updateUserSkill } from '../features/skill/skillSlice'
import { accessToken } from '../features/token/tokenSlice'

const UpdateSkill = () => {
    UseDocumentTitle("Update Skill")

    const levelOption = [
        "Basic",
        "Intermediate",
        "Advanced"
    ]

    const { id } = useParams()
    const { skill, isError, isSuccess, isLoading, message } = useSelector((state) => state.skill)
    const skillId = skill.find(skill => skill.id === id)

    useEffect(() => {
        if (skillId) {
            setData({
                skill_name: skillId?.skill_name,
                level: skillId?.level
            })
        }
    }, [skillId])

    const initialState = {
        skill_name: "",
        level: ""
    }

    const [dropDown, setDropDown] = useState(false)
    const [data, setData] = useState(initialState)
    const { skill_name, level } = data

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, isError: '', isSuccess: '' })
    }

    const handleUpdateSkill = (e) => {
        e.preventDefault()

        const updateData = {
            id,
            ...data
        }

        dispatch(updateUserSkill(updateData)).then(res => {
            dispatch(accessToken(res))
        })

    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
            navigate(`/skill/update/${skillId.id}`)
        }

        if (isSuccess) {
            toast.success(message)
            dispatch(getUserSkillInfo())
            navigate("/skill")

        }
        // dispatch(reset())
    }, [isError, isSuccess, message, skillId, dispatch, navigate])

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
                        <Button className='my-3 capitalize' color='red' size='sm'>
                            <i className='bx bx-arrow-back mr-1'></i>
                            Back
                        </Button>
                    </Link>
                </div>
                <h3 className='text-xl font-bold text-gray-500 pointer-events-non sm:text-2xl'>Update Skill</h3>

                <div className='px-3 w-full shadow-md shadow-gray-300 rounded-md'>
                    <form className="flex flex-col px-3 py-2 text-white mt-4 w-full">
                        <div className="w-full md:w-1/2 mb-3">
                            <label htmlFor="skill_name" className="text-red-800 text-xs md:text-sm">
                                Skill Name:
                            </label>
                            <input className='p-3 rounded-md outline-none text-xs md:text-sm w-full font-medium bg-red-500 placeholder:text-white' type="text" name='skill_name' id='skill_name' value={skill_name} onChange={handleChange} placeholder={skill.skill_name} autoComplete='off' />
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
                                    <option hidden defaultValue={skill.level}>{skill.level}</option>
                                    {levelOption.map((levelOption) => (
                                        <option key={levelOption}>
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
                                onClick={handleUpdateSkill}
                                color='red'
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateSkill