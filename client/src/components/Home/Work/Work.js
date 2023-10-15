import React, { useEffect, useState } from "react";
import { SectionSubtitle, SectionTitle } from "../../SectionTitleElements";
import {
    WorkButton,
    WorkCard,
    WorkContainer,
    WorkImg,
    WorkSection,
    WorkTitle,
} from "./WorkElements";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import SearchElement from "../../SearchElement";
import Pagination from "../../Pagination";

const Work = ({ darkMode }) => {
    const { portfolio } = useSelector((state) => state.portfolio)
    const [open, setOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 4
    const dispatch = useDispatch()

    const handleOpenModal = (project) => {
        setSelectedProject(project);
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

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
        setSearchParams({ page, search: searchTerm }) // Update search params in URL
    }, [portfolio, setSearchParams, page, searchTerm, dispatch])

    return (
        <>
            <WorkSection id="works">
                <SectionSubtitle>Portfolio</SectionSubtitle>
                <SectionTitle>Recent Works</SectionTitle>
                <SearchElement onSearch={handleSearch} darkMode={darkMode} />

                {/* skill have not set */}
                {searchData.length === 0 && portfolio.length === 0 && (
                    <h4 className='p-3 text-sm text-red-700 font-medium'>You have not set any portfolios.</h4>
                )}

                {/* data not found */}
                {searchData.length === 0 && (
                    <h4 className='p-3 text-sm text-red-700 font-medium'>Portfolio not found.</h4>
                )}
                <WorkContainer>

                    {paginatedData.map((portfolio) => (
                        <WorkCard light={darkMode ? 1 : 0} key={portfolio.id} className={`${darkMode ? 'dark' : ''}`}>
                            <WorkImg src={portfolio.project_image} alt="project_image"></WorkImg>
                            <WorkTitle light={darkMode ? 1 : 0}>{portfolio.project_title}</WorkTitle>

                            {portfolio.tags.map((tag, index) => (
                                <div key={index} className="inline-block p-2 my-1 mr-1.5 bg-red-100 rounded-lg cursor-pointer hover:bg-red-200 dark:bg-red-900 hover:dark:bg-red-600">
                                    <p className='text-xs text-red-600 font-base dark:text-gray-200'>{tag}</p>
                                </div>
                            ))}

                            <div className="flex mt-3">
                                <WorkButton href={portfolio.project_link} target="_blank">Demo</WorkButton>
                                <WorkButton className="btn_ghost" onClick={() => handleOpenModal(portfolio)}>
                                    More details
                                </WorkButton>
                            </div>
                        </WorkCard>
                    ))}
                </WorkContainer>

                <Pagination
                    data={searchData}
                    itemsPerPage={itemsPerPage}
                    page={page}
                    setPage={setPage}
                />

                {/* <div className="flex items-center justify-center">
                <ButtonMore href="#" target="_blank">
                    See More <i className='bx bx-right-arrow-alt'></i>
                </ButtonMore>
            </div> */}
            </WorkSection>

            {/* modal pop up portfolio details */}
            <div
                open={open}
                onClose={handleCloseModal}
                className={`fixed z-50 inset-0 h-screen flex justify-center items-center transition-colors ${open ? "visible bg-black/80" : "invisible"} ${darkMode ? 'dark' : ''}`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`max-h-[600px] w-full mx-3 md:mx-6 bg-white rounded-xl overflow-y-auto shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"} dark:bg-[#281F1FFF]`}
                >
                    <button
                        onClick={handleCloseModal}
                        className="fixed top-1 right-2 p-1.5 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 dark:bg-[#281F1FFF]"
                    >
                        <i className='bx bx-x text-2xl'></i>
                    </button>

                    {selectedProject && (
                        <div className="w-full h-full my-8">
                            <div className="flex flex-col md:gap-4 md:flex-row">
                                <img src={selectedProject.project_image} alt="project_image" className=" w-full md:w-1/2 lg:w-[500px] object-cover rounded-xl shadow-xl" />
                                <div className="mt-3">
                                    <h3 className="text-xl md:text-[32px] text-gray-800 my-3 dark:text-gray-300">{selectedProject.project_title}</h3>

                                    {selectedProject.tags.map((tag, index) => (
                                        <div key={index} className="inline-block p-2 my-1 mr-1.5 bg-red-100 rounded-lg cursor-pointer hover:bg-red-200 dark:bg-red-900 hover:dark:bg-red-600">
                                            <p className='text-xs text-red-600 font-base dark:text-gray-200'>{tag}</p>
                                        </div>
                                    ))}

                                    <div className="mt-3 md:mt-4">
                                        <WorkButton href={selectedProject.project_link} target="_blank">Project Demo</WorkButton>
                                    </div>
                                </div>
                            </div>

                            <div className='text-gray-800 break-words text-sm pt-6 dark:text-gray-200' dangerouslySetInnerHTML={{ __html: selectedProject.project_desc }}></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Work;
