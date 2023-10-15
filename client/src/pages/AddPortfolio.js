import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react'
import UseDocumentTitle from '../components/utils/useDocumentTitle/UseDocumentTitle'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { convertFileToBase64 } from '../components/convertToBase64';
import LogoPortFolio from '../assets/images/img_upload.png';
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createUserPortfolio, getUserPortfolio } from '../features/portfolio/portfolioSlice';
import { accessToken } from '../features/token/tokenSlice';

const AddPortfolio = () => {
    UseDocumentTitle("Add Portfolio")

    const module = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['blockquote', 'code-block', 'link'],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ]
    }

    const initialState = {
        project_title: "",
        project_desc: "",
        project_link: "",
        tags: [],
        project_image: "",

    }
    const { portfolio, isLoading, isSuccess, isError, message } = useSelector((state) => state.portfolio)
    const [data, setData] = useState(initialState)
    const [image, setImage] = useState();
    const [openDialog, setOpenDialog] = useState(false)
    const [tagData, setTagData] = useState([])
    const [hasChanged, setHasChanged] = useState(false)
    const { project_title, project_desc, project_link, tags } = data
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const value = e.target.value.trim()
            if (value) {
                setTagData([...tagData, value])
                setData({ ...data, tags: '' })
            }
        } else if (e.key === 'Backspace' && e.target.value === '') {
            if (tagData.length > 0) {
                const updatedTags = [...tagData]
                updatedTags.pop()
                setTagData(updatedTags)
            }
        }
    }

    const removeTag = (index) => {
        const updatedTags = [...tagData]
        updatedTags.splice(index, 1)
        setTagData(updatedTags)
        setData({ ...data, tags: updatedTags.join(',') })
    }

    const handleEditorChange = (value) => {
        setData({ ...data, project_desc: value });
    };

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog)
    }

    const handleChange = (e) => {
        if (e.target && e.target.name) {
            const { name, value } = e.target;
            setData({ ...data, [name]: value, isError: '', isSuccess: '' });
        }
    }

    const handleAvatar = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64Image = await convertFileToBase64(file);
                setImage(base64Image);
            } catch (error) {
                console.error('Error converting image:', error);
            }
        }
    }

    const handleCreatePortfolio = (e) => {
        e.preventDefault()

        const addData = {
            ...data,
            project_image: image,
            tags: [...tagData]
        }

        dispatch(createUserPortfolio(addData)).then(res => {
            dispatch(accessToken(res))
        })

        setOpenDialog(!openDialog)
    }

    const saveChangedDocument = () => {
        setHasChanged(true)
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
            navigate('/portfolio/add')
            // dispatch(reset())
        }

        if (isSuccess) {
            toast.success(message)
            dispatch(getUserPortfolio())
            navigate('/portfolio')
        }

        // handler unsaved document
        if (!hasChanged) return
        const handleOnBeforeUnload = (e) => {
            e.preventDefault()
            return (e.returnValue = '')
        }
        window.addEventListener('beforeunload', handleOnBeforeUnload, { capture: true })
        return () => {
            window.removeEventListener('beforeunload', handleOnBeforeUnload, { capture: true })
        }
    }, [isError, isSuccess, message, portfolio, hasChanged, dispatch, navigate])

    if (isLoading) {
        return (
            <div className='grid h-screen place-items-center'>
                <BounceLoader color="#ff0000" />
            </div>
        )
    }



    return (
        <div className='px-6 py-3 overflow-x-hidden'>
            <div className='flex items-center'>
                <a href="/portfolio">
                    <Button className='flex items-center justify-center my-3 capitalize' color='red' size='sm'>
                        <i className='bx bx-arrow-back mr-1'></i>
                        Back
                    </Button>
                </a>
            </div>

            <h3 className='text-xl font-bold text-gray-500 pointer-events-none sm:text-2xl'>Add Portfolio</h3>
            <form className='py-3' onChange={saveChangedDocument}>
                <div className='shrink-0'>
                    <img
                        className='object-cover rounded-md border-3 shadow-md shadow-red-200 border-red-300 md:w-[600px] md:h-[400px]'
                        src={image || LogoPortFolio}
                        alt="project_image"
                    />
                </div>
                <label className='block py-3 w-[500px]'>
                    <span className='sr-only'>Choose profile photo</span>
                    <input
                        type="file"
                        accept=".jpeg, .png, .jpg"
                        name='project_image'
                        className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-3
                                file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-100 file:text-red-800 hover:file:bg-red-200 file:cursor-pointer'
                        onChange={handleAvatar} autoComplete='off'
                    />
                </label>

                <div className='mb-1'>
                    <input className='p-3 my-2 rounded-md outline-none text-sm md:text-lg w-full font-semibold border-2 text-red-600 border-red-300 placeholder:text-red-200' type="text" name='project_title' id='project_title' value={project_title} onChange={handleChange} placeholder="Project title..." autoComplete='off' />
                </div>

                <div className='mb-1'>
                    <label htmlFor="project_link" className='text-red-800 font-semibold text-sm'>URL Link Project:</label>
                    <input className='p-3 my-1 rounded-md outline-none text-xs w-full font-semibold border-2 text-red-600 border-red-500 placeholder:text-red-200' type="text" name='project_link' id='project_link' value={project_link} onChange={handleChange} placeholder="Example: https://github.com/yourname" autoComplete='off' />
                </div>

                {/* tags input */}
                <div className='my-2'>
                    <label htmlFor="tags" className='text-red-800 font-semibold text-sm'>Write some tags:</label>
                    <div className='p-3 rounded-md w-full border-2 text-red-600 border-red-500'>
                        {tagData.map((tag, index) => (
                            <div className='inline-block p-[.75em] py-1 mr-1.5 my-1 bg-red-100 rounded-full' key={index}>
                                <span className='text-xs text-red-700 font-semibold pr-1'>{tag}</span>
                                <span className='text-white text-xs px-1 bg-red-700 rounded-full cursor-pointer hover:bg-red-500' onClick={() => removeTag(index)}>&times;</span>
                            </div>
                        ))}

                        <input type="text" enterKeyHint='enter' className='text-xs font-semibold outline-none placeholder:text-red-200' name='tags' id='tags' value={tags} onChange={handleChange} onKeyDown={handleKeyDown} placeholder='Enter for new tag...' autoComplete='off' />
                    </div>
                </div>

                <div>
                    <ReactQuill theme="snow" value={project_desc} onChange={handleEditorChange} modules={module} name="project_desc" id="project_desc" placeholder="Write description project here..." />
                </div>

                <Button color='red' size='sm' className='my-5 text-sm capitalize' onClick={handleOpenDialog}>
                    Save
                </Button>
            </form>

            {/* Dialog save button */}
            <Dialog open={openDialog} handler={handleOpenDialog} size='xs'>
                <DialogHeader>
                    <Typography variant="h5" color="blue-gray">
                        Attention is Required!
                    </Typography>
                </DialogHeader>

                <DialogBody divider className='grid place-items-center gap-4'>
                    <i className='bx bx-briefcase-alt text-4xl text-red-900'></i>
                    <Typography color="red" className="text-sm font-semibold md:text-lg">
                        Are you sure want to add portfolio?
                    </Typography>
                </DialogBody>

                <DialogFooter className='space-x-2'>
                    <Button variant="text" color="blue-gray" onClick={handleOpenDialog}>
                        Cancel
                    </Button>
                    <Button variant='gradient' color='red' onClick={handleCreatePortfolio} type='submit'>
                        Add
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default AddPortfolio