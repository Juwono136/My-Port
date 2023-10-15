import React from 'react'
import { Avatar, Button, Card, CardBody, CardHeader, Tooltip, Typography } from "@material-tailwind/react";
import { useSelector } from 'react-redux';
import SkillLevelCharts from './SkillLevelCharts';

const DashboardPage = () => {
    const { user } = useSelector((state) => state.user)
    const { skill } = useSelector((state) => state.skill)
    const { portfolio } = useSelector((state) => state.portfolio)
    // console.log(user.refresh_token)

    // recent works
    const sortedData = [...portfolio].sort((a, b) => {
        return b.id.localeCompare(a.id)
    })

    const latestPortfolio = sortedData[0] || null; // Get the latest portfolio item or null if none exists

    // console.log(latestPortfolio);

    return (
        <div className='px-6 py-3'>
            <h3 className='text-xl font-bold text-gray-500 pointer-events-non sm:text-2xl'>Dashboard</h3>
            <h2 className='text-sm text-gray-600 py-3 sm:text-xl'>Welcome, <span className='text-red-800'>{user.name}</span></h2>
            <div className='pb-5'>
                <a href="/" target='_blank'>
                    <Button color='red' size='sm'>
                        See My Homepage
                    </Button>
                </a>
            </div>
            <div className='px-3 py-4 w-full shadow-md bg-gray-50 shadow-gray-300 rounded-md'>
                <div className='grid gap-3 p-1 md:py-3 md:grid-cols-5'>
                    <div className='p-3 gap-2 bg-white md:col-span-3 shadow-lg rounded-lg'>
                        <Card color="transparent" shadow={false} className="w-full ">
                            <CardHeader
                                color="transparent"
                                floated={false}
                                shadow={false}
                                className="mx-0 flex items-center gap-4 pt-0 pb-4"
                            >
                                <div className='flex flex-col gap-3 w-full md:flex-row justify-between'>
                                    <Avatar
                                        size="lg"
                                        variant="circular"
                                        src={user.avatar}
                                        alt="user_image"
                                    />
                                    <div className="flex w-full flex-col gap-0.5">
                                        <div className="flex flex-col md:flex-row justify-between">
                                            <Typography variant="h5" className="text-red-600">
                                                {`${user.name}`} <a href="/profile"><i className='bx bx-link-external text-sm hover:text-red-800 hover:font-extrabold' ></i></a>
                                            </Typography>
                                            <div className="flex items-center gap-3">
                                                <Tooltip content="Github">
                                                    <Typography
                                                        variant="lead"
                                                        textGradient
                                                        className="text-black cursor-pointer"
                                                    >
                                                        <a href="https://github.com/Juwono136" target='_blank' rel="noreferrer">
                                                            <i className='bx bxl-github' ></i>
                                                        </a>
                                                    </Typography>
                                                </Tooltip>
                                                <Tooltip content="LinkedIn" className="bg-blue-800">
                                                    <Typography
                                                        variant="lead"
                                                        textGradient
                                                        className="text-blue-800 cursor-pointer"
                                                    >
                                                        <a href="https://www.linkedin.com/in/juwono136/" target='_blank' rel="noreferrer">
                                                            <i className='bx bxl-linkedin' ></i>
                                                        </a>
                                                    </Typography>
                                                </Tooltip>
                                                <Tooltip content="Instagram" className="bg-red-800">
                                                    <Typography
                                                        variant="lead"
                                                        textGradient
                                                        className="text-red-800 cursor-pointer"
                                                    >
                                                        <a href="https://www.instagram.com/uno_136/" target='_blank' rel="noreferrer">
                                                            <i className='bx bxl-instagram' ></i>
                                                        </a>
                                                    </Typography>
                                                </Tooltip>
                                                <Tooltip content="Codepen" className="bg-gray-800">
                                                    <Typography
                                                        variant="lead"
                                                        textGradient
                                                        className="text-gray-800 cursor-pointer"
                                                    >
                                                        <a href="https://codepen.io/juwono136" target='_blank' rel="noreferrer">
                                                            <i className='bx bxl-codepen' ></i>
                                                        </a>
                                                    </Typography>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <Typography className="text-red-300 text-xs font-semibold md:text-base">{`${user.stack}`}</Typography>
                                    </div>
                                </div>

                            </CardHeader>
                            <CardBody className="mb-3 p-0">
                                <Typography className="text-gray-700 text-xs md:text-base">
                                    {`${user.description}`}
                                </Typography>
                            </CardBody>
                        </Card>
                    </div>

                    <div className='grid col-span-1 p-3 bg-white shadow-lg rounded-lg'>
                        <div className='flex flex-col gap-3 justify-center items-center w-full h-full'>
                            <i className='bx bx-briefcase-alt-2 text-red-700'></i>
                            <h3 className='text-red-300 text-center text-base md:text-xl'>My Portfolios</h3>
                            <h1 className='text-red-500 font-bold'>{portfolio.length}</h1>
                        </div>
                    </div>

                    <div className='grid col-span-1 p-3 bg-white shadow-lg rounded-lg'>
                        <div className='flex flex-col gap-3 justify-center items-center w-full h-full'>
                            <i className='bx bx-book text-red-700'></i>
                            <h3 className='text-red-300 text-center text-base md:text-xl'>My Skills</h3>
                            <h1 className='text-red-500 font-bold'>{skill.length}</h1>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-4 p-1 mt-2 w-full rounded-md md:py-3 md:grid-cols-2'>
                    <div className='p-3 gap-2 bg-white col-span-1 shadow-lg rounded-lg'>
                        <div className='flex items-center p-0'>
                            <a href="/skill" className='text-red-600 text-base md:text-xl font-semibold p-1 hover:font-extrabold hover:underline decoration-red-500'>
                                <i className='bx bx-link-alt'></i> Skill Level
                            </a>
                        </div>
                        <SkillLevelCharts data={skill} />
                    </div>

                    <div className='p-3 gap-2 bg-white col-span-1 shadow-lg rounded-lg'>
                        <div className='flex items-center p-0'>
                            <a href="/portfolio" className='text-red-600 text-base md:text-xl font-semibold p-1 hover:font-extrabold hover:underline decoration-red-500'>
                                <i className='bx bx-link-alt'></i> Recent Work
                            </a>
                        </div>

                        <div className='p-3 rounded-lg' key={latestPortfolio?.id}>
                            <div>
                                <img src={latestPortfolio?.project_image} alt="portfolio" className='rounded-xl object-cotain md:h-max shadow-lg' />
                                <h3 className='py-2 text-sm break-words font-semibold md:text-lg text-gray-700'>{latestPortfolio?.project_title}</h3>

                                {latestPortfolio?.tags.map((tag, index) => (
                                    <div key={index} className='inline-block p-2 my-1 mr-1.5 bg-red-100 rounded-lg cursor-pointer hover:bg-red-200'>
                                        <p className='text-xs text-red-600 font-base'>{tag}</p>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashboardPage