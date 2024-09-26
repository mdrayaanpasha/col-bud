import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AreaReply = () => {
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
            const Data = await axios.post("http://localhost:9090/AreaPostFetcher",{PID:id})
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
                const response = await axios.post("http://localhost:9090/AreaPostReply",{D:Data})
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


  return (
    <>
    <div>
        {/*
        so i wanna display the post itself and then the replies.
        */}

        {PostData && 
        <>
        <p>{PostData[0].Desc}</p>
        <p>{PostData[0].Course}</p>
        <p>{PostData[0].UserName}</p>
        </>
        }

        {ExistingReplies && ExistingReplies.map(ele=>(
            <>
            <p>{ele.userName}</p>
            <p>{ele.description}</p>
            </>
        ))}

      
      <button onClick={e=>setReply(true)}>Reply to this post!</button>

    </div>
    {Reply &&
    <>
    <textarea type="text" name="replytext" placeholder="enter your reply...." id="" onChange={e=>setReplyText(e.target.value)} />
    <input type="submit" value="Post!" onClick={e=>post()} />
    </>
    }
    </>
  );
};

export default AreaReply;
