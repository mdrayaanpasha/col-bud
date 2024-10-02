import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Nav from "./nav"
import defImg from "./assets/def.png"


const Reply = () => {
    const [Reply,setReply] = useState(false)
    const [replytext,setReplyText] = useState(null)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const Email= localStorage.getItem("E#M")

    //i need to fetch the post itself. and display it, also ill fetch the previous replies here

    const [ExistingReplies,setExistingReplies]=useState(null)
    const [PostData,setPostData]=useState(null)
    const postFetcher = async()=>{
        try {
            const Data = await axios.post("http://localhost:9090/postfetcher",{PID:id})
            if(Data.data.message){
                console.log(Data.data.PostData)
                setPostData(Data.data.PostData)
                
                console.log(PostData)
                setExistingReplies(Data.data.PreviousData)
            }else{
                alert("some error in backend")
            }
        } catch (error) {
            alert("some error in frontend")
        }
    }

    useEffect(()=>{
        postFetcher()
    },[id])
    
    
    
   


    //here i wanna post the thing in my backend.
    const post = async()=>{
        if(!Email){
            alert("you aren't signed in!")
            window.location.href="./reg"
        }else{
            const Data = {
                postId:id,
                description:replytext,
                UserEmail:Email
            }
            try {
                const response = await axios.post("http://localhost:9090/postReply",{D:Data})
                if(response.data.message){
                    alert("done!")
                }else{
                    alert("error in backend")
                }
            } catch (error) {
                console.log(error)
                alert("error in frontend")
            }
        }
      
    }

    useEffect(()=>{
        if(PostData){
            console.log("PostData: ",PostData)
        }
    },[PostData])


  return (
    <>
    <style>
        {`
         .post{
            margin-left:2vw;
            margin-top:2vh;
            padding:1vw;
            width:80%;
            display:flex;
            gap:2vw;
            padding:2vw;
            
            
            border-radius:0.5vw;
            }
            .img-container img{
                height:10vh;
                border-radius:50%;
            }
           
            .text-container button, button{
            background:white;
            height:6vh;
            width:10vw;
            border:none;
            color:black;
            font-weight:bolder;
            border-radius:0.5vw;
            }
            .container img{
            height:10vh;
            width:5vw;

            border-radius:50%;
            }
            hr{
            margin-top:0;
          
            border:none;
            border:1px solid grey;
            }
            .reply-div{
                position:fixed;
                display:flex;
                align-item:center;
                bottom:2%;
            }
            .reply-div textarea{
                width:63vw;
                background-color:#181818;
                color:white;
                padding:1vw;
            }
            .reply-div button{
                border-radius:50%;
                height:5vh;
                width:5vw;
            }
          
        `}
    </style>
        <Nav></Nav>
        <main>
            <div className="post">
                {PostData && PostData.length > 0 &&
                    <>
                        <div className="img-container">
                            <img src={PostData[0].An ? defImg :  PostData[0].Img} alt="notthere" />
                        </div>
                        <div className="text-container">
                            <p><b>{PostData[0].An ? "Annonymous User": PostData[0].UserName}<small style={{color:"grey",marginLeft:"2vw"}}>{PostData[0].An ? "" : PostData[0].Course}</small></b></p>
                            <p>{PostData[0].Desc}</p>
                                          
                        </div>
                    </>
                }
            
            </div>
       
            <h4>Replies</h4>
            <br />

            {ExistingReplies && ExistingReplies.length > 0 ?  ExistingReplies.map(ele=>(
                <>
                <div className="post">
                    <div className="img-container">
                        <img src={ele.selectedImg} alt="notthere" />
                    </div>
                    <div className="text-container">
                        <p><b>{ele.userName}</b></p>
                        <p>{ele.description}</p>               
                    </div>
                </div>
                <hr />
                </>
            )):(

                <p>No replies, yet!</p>
            )}
    
        
        
            <div className="reply-div">
                <textarea type="text" name="replytext" placeholder="Enter Your Reply" id="" onChange={e=>setReplyText(e.target.value)} />
                <input type="submit" value="Reply" onClick={e=>post()} />
            </div>
            
            
        </main>
    </>

  );
};

export default Reply;
