import { useEffect, useState } from "react"
import axios from "axios";

function Notifications(){
    const [myRequests,setmyRequests]=useState(false);
    const [PendingData,setPendingData]=useState(null)
    const [NewNotificationsData,setNewNotificationsData]=useState(null)

    const Email = localStorage.getItem("E#M")
    const acceptReq = async(id)=>{
        try {
            const response = await axios.post("http://localhost:9090/createConnection",{PostId:id,userEmail:Email});
            if(response.data.message){
                alert("accepted successfully!")
                window.location.href="./notifications"
            }else{
            alert("some error in frontend!")
            }
        } catch (error) {
            alert("error in backend")
            console.log(error)
        }
    }

    const reject = async(id)=>{
        alert(id)
    }


    async function withdraw(id){
        try {
            const delReq = await axios.post("http://localhost:9090/conDel",{PID:id})
            if(delReq.data.message){
                alert("deleted")
            }else{
                alert("problem in the backend")
            }
        } catch (error) {
            alert(error)
        }
    }

    //lets fetch pending requests of user!
    useEffect(()=>{
        const retrivePending = async ()=>{
        try {
            const response = await axios.post("http://localhost:9090/conStat",{email:Email})
            if(response.data.message){
                setPendingData(response.data.Data)
            }else{
                alert("problem in backend")
            }
        } catch (error) {
         alert(error)   
        }
    }
    retrivePending()

  
    const retriveNew = async ()=>{
        try {
            const response = await axios.post("http://localhost:9090/newCons",{email:Email})
            if(response.data.message){
                setNewNotificationsData(response.data.Data)
            }else{
                alert("there is an error in the backend")
            }
        } catch (error) {
            alert(error)
        }

    }
    retriveNew()
    },[])
    if(!Email){
        return(
            <>
        
            please signin to check your notifications!
            </>
        )
    }else{
    return(
        <>

{!myRequests && (
    <>
        {NewNotificationsData && NewNotificationsData.length > 0 ? (
            NewNotificationsData.map((ele) => (
                <div key={ele._id}>
                    <p>{ele.RequesterName} Has Sent You a Request!</p>
                    <button onClick={e=>acceptReq(ele._id)}>accept</button>
                   <button onClick={e=>reject(ele._id)}>reject</button>
                    <br />
                </div>
            ))
        ) : (
            <p>You haven't sent any connection requests that haven't been accepted yet!</p>
        )}
        <p>So you have this as your notifications?</p>
        <button onClick={() => setmyRequests(!myRequests)}>Check My Connection Status</button>
    </>
)}


        {myRequests && 
        <>
        these are the pending request you've sent and their status!
        {PendingData?.length > 0 ? (
    PendingData.map((ele) => (
        <div key={ele._id}>
            <p>{ele.PosterName}</p>
            <button onClick={() => withdraw(ele._id)}>withdraw!</button>
            <br />
        </div>
    ))
) : (
    <p>You haven't sent any connection requests that haven't been accepted yet!</p>
)}

        <button onClick={e=>setmyRequests(!myRequests)}>Check My New Connection Requests</button>
        </>
        }
        </>
    )
}
}

export default Notifications