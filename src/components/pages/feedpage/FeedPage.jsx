import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { get, post } from "../../../services/publicRequest"
import { POSTS } from "../../../services/apiEndpoints"

const FeedPage = () => {
    const [allPosts, setAllPosts] = useState([])
    const [postData, setPostData] = useState({
        post: ''
    })

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
            <Box width='500px' marginLeft={20}>
                <Card>
                    <CardContent>
                        <Button>Post</Button>
                        <Button>Question</Button>
                        <Button>Discussion</Button>
                        <hr />
                        <TextField
                            label='Whats in your mind?'
                            multiline maxRows={5}
                            fullWidth
                            value={postData.post}
                            onChange={(e) => setPostData({ ...postData, post: e.target.value })}
                        />
                        <hr />
                        <Button variant="contained" onClick={createPost}>Post</Button>
                    </CardContent>
                </Card>
            </Box><br />
            <br />

            <Stack spacing={2} marginLeft={20}>
                {
                    allPosts.map((item) => (
                        <Box width='500px' key={item.id}>
                            <Card>
                                <CardContent>
                                    <Button>Post</Button>
                                    <hr />
                                    <Typography variant="body-2">{item.post}</Typography>
                                    <hr />
                                    <Button variant="contained">Like</Button>
                                    <Button variant="contained">Share</Button>
                                    <Button variant="contained">Comment</Button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))
                }
            </Stack>
        </>
    )
}

export default FeedPage