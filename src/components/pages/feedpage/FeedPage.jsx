// import { Box, Button, Card, CardContent, Checkbox, Divider, Fab, FormControlLabel, Stack, Tab, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
// import { useEffect, useRef, useState } from "react"
// import { get, post } from "../../../services/publicRequest"
// import { POSTS } from "../../../services/apiEndpoints"
// import Poll from "./Poll"
// import './Poll.css'
// import { TabContext, TabList } from "@mui/lab"



// const FeedPage = () => {

//     const [toggle, setToggle] = useState('questions')
//     const [isPoll, setIsPoll] = useState(false)
//     const [allPosts, setAllPosts] = useState([])
//     const [imgError, setImgError] = useState('')
//     const [fileError, setFileError] = useState('')
//     const uploadImgRef = useRef(null)
//     const uploadFileRef = useRef(null)
//     const [postData, setPostData] = useState({
//         post: ''
//     })

//     const validateImg = (file) => {
//         if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
//             return true
//         }
//         else {
//             return false
//         }
//     }

//     const validateFile = (file) => {
//         if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//             return true
//         }
//         else {
//             return false
//         }
//     }

//     const handleChange = (e, newToggle) => {
//         setToggle(newToggle)
//     }


//     const createPost = () => {
//         console.log(postData)
//         post(POSTS, postData)
//             .then(resp => {
//                 console.log(resp.data)
//                 setPostData({ ...postData, post: '' })
//                 fetchPosts()
//             })

//     }

//     const fetchPosts = async () => {
//         const resp = await get(POSTS)
//         console.log("data ", resp.data)
//         setAllPosts(resp.data.reverse())

//     }

//     useEffect(() => {
//         fetchPosts()
//     }, [])




//     return (
//         <>
//             <div className="question-box">
//                 {/* <Box width='500px'>
//                     <Card>
//                         <CardContent>
//                             <ToggleButtonGroup
//                                 color="primary"
//                                 value={toggle}
//                                 exclusive
//                                 aria-label="Platform"
//                                 onChange={handleChange}
//                             >
//                                 <ToggleButton value="questions">Questions</ToggleButton>
//                                 <ToggleButton value="discussion">Discussion</ToggleButton>
//                             </ToggleButtonGroup>
//                             <hr />
//                             {
//                                 toggle === 'questions'
//                                     ?
//                                     <div>
//                                         <TextField
//                                             variant="standard"
//                                             label={`What's your question?`}
//                                             multiline maxRows={5}
//                                             fullWidth
//                                             value={postData.post}
//                                             onChange={(e) => setPostData({ ...postData, post: e.target.value })}
//                                         />
//                                         {
//                                             isPoll
//                                             &&
//                                             <Poll />
//                                         }
//                                         <br />
//                                         <FormControlLabel control={<Checkbox onChange={(e) => setIsPoll(e.target.checked)} />} label="Poll" />
//                                         <FormControlLabel control={<Checkbox />} label="Ask Anonymously" />
//                                         <br />
//                                         <div className="upload">
                                            
//                                                 <Button
//                                                     variant="outlined"
//                                                     component="label"
//                                                 >
//                                                     Upload Image/Video
//                                                     <input
//                                                         type="file"
//                                                         id="image"
//                                                         ref={uploadImgRef}
//                                                         onChange={(e) => {
//                                                             if (validateImg(e.target.files[0])) {
//                                                                 imgError && setImgError('');
//                                                             }
//                                                             else {
//                                                                 setImgError("Invalid format, Upload .jpg/.jpeg/.png")
//                                                                 uploadImgRef.current.value = '';
//                                                             }
//                                                         }}
//                                                         hidden
//                                                     />
//                                                 </Button>
                                                
                                            
//                                                 <Button
//                                                     variant="standard"
//                                                     component="label"
//                                                 >
//                                                     File
//                                                     <input
//                                                         type="file"
//                                                         id="file"
//                                                         ref={uploadFileRef}
//                                                         onChange={(e) => {
//                                                             console.log(e.target.files[0].type)
//                                                             if (validateFile(e.target.files[0])) {
//                                                                 fileError && setFileError('');
//                                                             }
//                                                             else {
//                                                                 setFileError("Invalid format, Upload .pdf/.doc/.docx")
//                                                                 uploadFileRef.current.value = '';
//                                                             }
//                                                         }}
//                                                         hidden
//                                                     />
//                                                 </Button>
//                                         </div>
                                        
//                                         {fileError && <span className="error-msg">{fileError}</span>}
//                                         {imgError && <span className="error-msg">{imgError}</span>}

//                                     </div>

//                                     :
//                                     <TextField
//                                         label='What do you want to discuss?'
//                                         multiline maxRows={5}
//                                         fullWidth
//                                         value=""
//                                         onChange={(e) => setPostData()}
//                                     />
//                             }
//                             <hr />
//                             {
//                                 toggle === 'questions'
//                                     ?

//                                     <Button variant="contained" onClick={createPost}>Ask</Button>
//                                     :
//                                     <Button variant="contained">Post</Button>
//                             }
//                         </CardContent>
//                     </Card>
//                 </Box> */}

//                 <Box sx={{ width: '100%', typography: 'body1' }}>
//                     <TabContext value={value}>
//                         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                             <TabList onChange={handleChange} aria-label="lab API tabs example">
//                                 <Tab label="Item One" value="1" />
//                                 <Tab label="Item Two" value="2" />
//                                 <Tab label="Item Three" value="3" />
//                             </TabList>
//                         </Box>
//                         <TabPanel value="1">Item One</TabPanel>
//                         <TabPanel value="2">Item Two</TabPanel>
//                         <TabPanel value="3">Item Three</TabPanel>
//                     </TabContext>
//                 </Box>

//             </div><br />
//             <hr />
//             <br />
//             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <Stack spacing={2} >
//                     {
//                         allPosts.map((item) => (
//                             <Box width='500px' key={item.id}>
//                                 <Card>
//                                     <CardContent>
//                                         <Typography variant="h6">Post</Typography>

//                                         <hr />
//                                         <Typography variant="body-2">{item.post}</Typography>
//                                         <hr />

//                                         <div className='like-share'>
//                                             <Button><i className="fa-regular fa-heart fa-xl"></i></Button>
//                                             <Button><i className="fa-regular fa-comment fa-xl"></i></Button>
//                                             <Button><i className="fa-regular fa-share-from-square fa-xl"></i></Button>
//                                         </div>
//                                     </CardContent>
//                                 </Card>
//                             </Box>
//                         ))
//                     }
//                 </Stack>
//             </div>
//         </>
//     )
// }

// export default FeedPage