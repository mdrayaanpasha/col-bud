import React from 'react';
import { useState } from 'react';
import axios from 'axios';


function AreaPost() {

    const Email = localStorage.getItem("E#M")
    const [vis,setVis]=useState(false);
    const [reply,setReply]=useState(true);
    const [Description,setDescription]=useState(null);
    const formHandle = async(e)=>{
        e.preventDefault()
        const Data = {
            Description:Description,
            Anonymous:vis,
            ReplyPerm:reply,
            UserEm:Email,
            
        }
        try {
            const response = await axios.post("http://localhost:9090/AreaPost",{D:Data});
            if(!response.data.message){
                alert("there is some problem in backend services!")
            }else{
                alert("posted!")
            }
            window.location.href="./feed"
        } catch (error) {
            console.log(error)
        }
    }
    if(!Email){
        return(
            <>
            please Login First!
            </>
        )
    }else{
        
        return (
            <>
                <form onSubmit={e=>formHandle(e)}>
                    <textarea name="description" id="description" placeholder="Enter your description here..." onChange={e=>setDescription(e.target.value)}></textarea>
                    
                    <fieldset>
                        <legend>Visibility</legend>
                        <label htmlFor="anonymous">
                            <input type="radio" name="visibility" id="anonymous" value="anonymous" onClick={e=>setVis(true)} />
                            Keep it Anonymous
                        </label>
                        <label htmlFor="non-anon">
                            <input type="radio" name="visibility" id="non-anon" value="non-anon" onClick={e=>setVis(false)} />
                            Not Anonymous
                        </label>
                    </fieldset>
                    
                    <fieldset>
                        <legend>Replies</legend>
                        <label htmlFor="reply">
                            <input type="radio" name="replies" id="reply" value="reply" onClick={e=>setReply(true)} />
                            Allow Replies
                        </label>
                        <label htmlFor="no-reply" onClick={e=>setReply(false)}>
                            <input type="radio" name="replies" id="no-reply" value="no-reply" />
                            No Replies
                        </label>
                    </fieldset>
                    
                    <button type="submit">Submit</button>
                </form>
            </>
        );
    }
}

export default AreaPost