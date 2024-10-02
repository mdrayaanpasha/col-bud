import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Nav from './nav';
import LamePage from './lame';
import defImg from "./assets/def.png"


function Colpost() {


    const Email = localStorage.getItem("E#M");
    const [userInfo,setUserInfo]=useState(null)
    const [vis,setVis]=useState(false);
    const [reply,setReply]=useState(true);
    const [Description,setDescription]=useState(null);
    useEffect(()=>{
        const fetchUserInfo = async ()=>{
            try {
                const response = await axios.post("http://localhost:9090/getMyInfo",{email:Email});
                if(response.data.message){
                    setUserInfo(response.data.D);
                }else{
                    alert("There was a problem in backend")
                }
            } catch (error) {
                console.log(error);
                alert("error in frontend")
            }
        }
        fetchUserInfo()
        console.log(userInfo)
        
    },[])
    const formHandle = async(e)=>{
        e.preventDefault()
        const Data = {
            Description:Description,
            Anonymous:vis,
            ReplyPerm:reply,
            UserEm:Email,
            
        }
        try {
            const response = await axios.post("http://localhost:9090/Post",{D:Data});
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
            <Nav></Nav>
            <style>
                {`
                .post-section{
                    padding:2vw;
                }
                .form-section{
                    padding:1vw;
                    gap:3vh !important;
                }
                textarea{
                 width:60vw;
                 height:20vh;
                 padding:0.2vw;
                 color:grey;
                 background:#181818;
                 border:1px soild grey;
                }
                 .feildset{
                 
                 margin-top:4vh;
                 }
                 .feildset input{
                 margin-left:3vw;
                 margin-right:0.3vw;
                 
                 }
                 .feildset label{
                 color:grey !important;
                 }
                 .post img{
                    height:8vh;
                 }
                .post{
                    border:1px solid grey;
                    margin:5vh;

                }
                label{
                    margin-bottom:1vh;
                }
                    
                 

                `}
            </style>

            <main>
                <div className="post-section">
                    <h2>College Post.</h2>
                    <div className="form-section">
                    <form onSubmit={e=>formHandle(e)}>
                        <label htmlFor="description">What's on your mind today? 🧠</label> <br />
                        <textarea name="description" id="description" placeholder="Share your thoughts..." onChange={e=>setDescription(e.target.value)}></textarea>

                        <div className="feildset">
                        <fieldset>
                            <legend>Wanna stay anonymous?</legend>
                            <label htmlFor="anonymous">
                                <input type="radio" name="visibility" id="anonymous" value="anonymous" onClick={e=>setVis(true)} />
                                Yep, mystery mode 😎
                            </label>
                            <label htmlFor="non-anon">
                                <input type="radio" name="visibility" id="non-anon" value="non-anon" onClick={e=>setVis(false)} />
                                Nope, I’m cool with my name showing 🙂
                            </label>
                        </fieldset>
                        </div>
                        <div className="feildset">
                        <fieldset>
                            <legend>Want replies?</legend>
                            <label htmlFor="reply">
                                <input type="radio" name="replies" id="reply" value="reply" onClick={e=>setReply(true)} />
                                Yep, let's chat! 🗣️
                            </label>
                            <label htmlFor="no-reply">
                                <input type="radio" name="replies" id="no-reply" value="no-reply" onClick={e=>setReply(false)} />
                                Nah, just leaving this here 🛑
                            </label>
                        </fieldset>
                        </div>
                        <div className="preview" style={{marginTop:"5vh"}}>
                            <h4>Post Preview</h4>
                            {userInfo && 
                                <>
                                    <div  className="post">
                                        <div className="img-container">
                                            <img src={!vis ? userInfo.selectedImg : defImg} alt="notthere" />
                                        </div>
                                        <div className="text-container">
                                            <p><b>{!vis ? userInfo.name : "Annonymous User"}  <small style={{color:"grey",marginLeft:"2vw"}}>{!vis ? userInfo.course: ""}</small></b></p>
                                            <p style={{color:"grey"}}>{Description}</p>
                                            
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <button type="submit">Submit 🚀</button>
                    </form>

                    </div>
                    
                </div>
                
                </main>
            </>
        );
    }
}

export default Colpost;
