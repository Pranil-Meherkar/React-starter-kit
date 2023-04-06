import { Box, Button, Card, CardContent, Checkbox, Divider, Fab, FormControlLabel, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { get, post } from "../../../services/publicRequest"
import { POSTS } from "../../../services/apiEndpoints"
import Poll from "./Poll"
import './Poll.css'


const FeedPage = () => {

    const [toggle, setToggle] = useState('questions')
    const [isPoll, setIsPoll] = useState(false)
    const [allPosts, setAllPosts] = useState([])
    const [postData, setPostData] = useState({
        post: ''
    })

    const handleChange = (e, newToggle) => {
        setToggle(newToggle)
    }
    const label = { inputProps: { 'aria-label': 'Poll' } };

    const createPost = () => {
        console.log(postData)
        post(POSTS, postData)
            .then(resp => {
                console.log(resp.data)
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Box width='500px'>
                    <Card>
                        <CardContent>
                            <ToggleButtonGroup
                                color="primary"
                                value={toggle}
                                exclusive
                                aria-label="Platform"
                                onChange={handleChange}
                            >
                                <ToggleButton value="questions">Questions</ToggleButton>
                                <ToggleButton value="discussion">Discussion</ToggleButton>
                            </ToggleButtonGroup>
                            <hr />
                            {
                                toggle === 'questions'
                                    ?
                                    <div>
                                        <TextField
                                            variant="standard"
                                            label={`What's your question?`}
                                            multiline maxRows={5}
                                            fullWidth
                                            value={postData.post}
                                            onChange={(e) => setPostData({ ...postData, post: e.target.value })}
                                        />
                                        {
                                            isPoll
                                            &&
                                            <Poll />
                                        }
                                        <br />
                                        <FormControlLabel control={<Checkbox onChange={(e) => setIsPoll(e.target.checked)} />} label="Poll" />
                                        <FormControlLabel control={<Checkbox />} label="Ask Anonymously" />
                                    </div>

                                    :
                                    <TextField
                                        label='What do you want to discuss?'
                                        multiline maxRows={5}
                                        fullWidth
                                        value=""
                                        onChange={(e) => setPostData()}
                                    />
                            }
                            <hr />
                            {
                                toggle === 'questions'
                                    ?

                                    <Button variant="contained" onClick={createPost}>Ask</Button>
                                    :
                                    <Button variant="contained">Post</Button>
                            }
                        </CardContent>
                    </Card>
                </Box>
            </div><br />
            <hr />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Stack spacing={2} >
                    {
                        allPosts.map((item) => (
                            <Box width='500px' key={item.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">Post</Typography>
                                        
                                        <hr/>
                                        <Typography variant="body-2">{item.post}</Typography>
                                        <hr/>
                                       
                                        <div className = 'like-share'>
                                        <Button><i class="fa-regular fa-heart fa-xl"></i></Button>
                                        <Button><i class="fa-regular fa-comment fa-xl"></i></Button>
                                        <Button><i class="fa-regular fa-share-from-square fa-xl"></i></Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))
                    }
                </Stack>
            </div>
        </>
    )
}

export default FeedPage