import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Avatar, Button, Card, CardContent, Checkbox, Divider, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import Poll from '../feedpage/Poll';
import { Stack, border, borderRadius, padding } from '@mui/system';
import './FeedPageMain.css'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { POSTS } from '../../../services/apiEndpoints';
import { get, post } from '../../../services/publicRequest';
import Comment from '../../../assets/svg/Comment.svg'
import Report from '../../../assets/svg/Report.svg'

const FeedPageMain = () => {
    const [value, setValue] = useState('1');
    const [toggle, setToggle] = useState('questions')
    const [isPoll, setIsPoll] = useState(false)
    const [allPosts, setAllPosts] = useState([])
    const [imgError, setImgError] = useState('')
    const [fileError, setFileError] = useState('')
    const uploadImgRef = useRef(null)
    const uploadFileRef = useRef(null)
    const [postData, setPostData] = useState({
        post: ``
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const validateImg = (file) => {
        if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
            return true
        }
        else {
            return false
        }
    }

    const validateFile = (file) => {
        if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return true
        }
        else {
            return false
        }
    }

    const createPost = () => {
        console.log(postData)
        post(POSTS, postData)
            .then(resp => {
                console.log("post created",resp.data)
                setPostData({ ...postData, post: '' })
                fetchPosts()
            })

    }

    const fetchPosts = async () => {
        const resp = await get(POSTS)
        console.log("data ", resp.data)
        setAllPosts(resp.data.reverse())

    }

    useEffect(() => {
        fetchPosts()
    }, [])


    return (
        <>
            <div className='main-feed'>
                <Box
                    sx={{
                        width: '70%',
                        borderRadius: '8px',
                        padding: '1rem',
                        boxShadow: '0px 4px 4px gray'
                    }}>
                    <TabContext value={value}>
                        <Box sx={{
                            borderBottom: 1,
                            borderColor: 'divider'
                        }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Questions" value="1" />
                                <Tab label="Discussion Forum" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1" sx={{ padding: '20px 0 0 0' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Avatar alt="Remy Sharp" src="https://www.hindubhagwan.com/Gallery/images/portfolio/full/small/lord_hanuman_angry_image.jpg" />
                                <textarea
                                    variant="outlined"
                                    placeholder={`What's your question?`}
                                    multiline maxRows={5}
                                    
                                    fullWidth
                                    value={postData.post}
                                    onChange={(e) => setPostData({ ...postData, post: e.target.value })}
                                    
                                    className="inputRounded"
                                /></Box>
                            {/* {
                            isPoll
                            &&
                            <Poll />
                        } */}
                            {/* <br />
                        <FormControlLabel control={<Checkbox onChange={(e) => setIsPoll(e.target.checked)} />} label="Poll" />
                        <FormControlLabel control={<Checkbox />} label="Ask Anonymously" />
                        <br /> */}
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '1.25rem',
                                
                            }}>
                                <Box sx={{ display: 'flex', gap: '1rem',marginLeft:'3rem' }}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="small"
                                    >
                                        <Box sx={{ display: 'flex' }}>
                                            <span style={{paddingRight:'0.5rem'}}>Photo/Video</span>
                                            <PhotoLibraryIcon style={{borderLeft:'1px solid',paddingLeft:'0.5rem'}} /></Box>
                                        <input
                                            type="file"
                                            id="image"
                                            ref={uploadImgRef}
                                            onChange={(e) => {
                                                if (validateImg(e.target.files[0])) {
                                                    imgError && setImgError('');
                                                }
                                                else {
                                                    setImgError("Invalid format, Upload .jpg/.jpeg/.png")
                                                    uploadImgRef.current.value = '';
                                                }
                                            }}
                                            hidden
                                        />
                                    </Button>


                                    <Button
                                        variant="outlined"
                                        component="label"
                                    >
                                        <span style={{paddingRight:'0.5rem'}}>File</span> <span style={{borderLeft:'1px solid',paddingLeft:'0.5rem'}}><i className="fa-solid fa-paperclip"></i></span>
                                        <input
                                            type="file"
                                            id="file"
                                            ref={uploadFileRef}
                                            onChange={(e) => {
                                                console.log(e.target.files[0].type)
                                                if (validateFile(e.target.files[0])) {
                                                    fileError && setFileError('');
                                                }
                                                else {
                                                    setFileError("Invalid format, Upload .pdf/.doc/.docx")
                                                    uploadFileRef.current.value = '';
                                                }
                                            }}
                                            hidden
                                        />
                                    </Button>
                                </Box>
                                <Box sx={{ display: 'flex', gap: '1rem' }}>
                                    <Button>Main Feed</Button>
                                    <Button variant='contained' onClick={createPost}>Post</Button>
                                </Box>
                            </Box>

                            {fileError && <span className="error-msg">{fileError}</span>}
                            {imgError && <span className="error-msg">{imgError}</span>}


                        </TabPanel>
                        <TabPanel value="2">
                            <TextField
                                label='What do you want to discuss?'
                                multiline maxRows={5}
                                fullWidth
                                value=""
                                onChange={(e) => setPostData()}

                            /></TabPanel>
                    </TabContext>
                </Box >
            </div>
            <p className='recent'>{`Recent Activity > Post Questions`}</p>

            <div>
                <Stack spacing={2} >
                    {
                        allPosts.map((item) => (
                            <Box key={item.id} className='render-post'>
                                <Box className='post-profile'>
                                    <Grid container spacing={2} >
                                        <Grid item>
                                        <Avatar alt="Remy Sharp" src="https://www.hindubhagwan.com/Gallery/images/portfolio/full/small/lord_hanuman_angry_image.jpg" />
                                        </Grid>
                                        <Grid item >
                                            <Box className='profile-details'>Aditya Titame</Box>
                                            <Box className='update-details'>Post 2 hrs ago</Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className='group-details'><p>Ashok- Clarion Technology- Power BI</p></Box>
                                <Box className='questions'>
                                    <p>Questions</p>
                                    <div className='post-data'>{item.post.split('\n').join('\n<br/>')}</div>
                                </Box>
                                <Box className='footer'>
                                    <span>Like</span>
                                    <span><img src={Comment} alt='comment'/>Comment</span>
                                    <span><img src={Report} alt='Report'/>Report</span>
                                </Box>
                            </Box>
                        ))
                    }
                </Stack>
            </div>
        </>
    )
}

export default FeedPageMain