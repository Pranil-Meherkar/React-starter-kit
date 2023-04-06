import { Button, TextField } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react"
import './Poll.css'

const Poll = () => {
    const [pollList, setPollList] = useState([{ poll: '' },{ poll: '' }])

    const handlePollAdd = () => {
        setPollList([...pollList, { poll: '' }])
    }
    const handlePollRemove =(index) =>{
        const list = [...pollList]
        list.splice(index,1);
        setPollList(list)
    }
    const handleServiceChange = (e,index) =>{
        const {name , value} = e.target
        const list = [...pollList]
        list[index][name]= value;
        setPollList(list)
    }

    return (
        <div  className="poll-div">
            {
                pollList.map((poll, index) => (
                    <div key={index} className="poll-inner">
                        <TextField 
                        label={`Option ${index+1}`}
                        name="poll"
                        value={poll.poll}
                        onChange={(e)=> handleServiceChange(e,index)}
                        size="small"
                        sx={{marginBottom:'0.5rem',width:'20rem'}}
                        
                        />
                        {
                            pollList.length > 2 && <Button onClick={()=>handlePollRemove(index)}><ClearIcon/></Button>
                        }
                        <br/>
                        {
                            pollList.length - 1 === index && <Button onClick={handlePollAdd}>Add Option</Button>
                        }

                    </div>
                ))
            }
        </div>
    )
}

export default Poll