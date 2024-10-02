import { useEffect, useState } from "react"
import axios from "axios";
import Nav from "./nav";
import LamePage from "./lame";

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
        <Nav></Nav>
        <main>
        <LamePage
                    title="You Are Not Signed In!"
                    description=""
                    url="./reg"
                    btnContent="Sign in Now"
        />
        </main>
        </>
        )
    }else{
    return(
        <>
        <style>
            {`
                .section-right{
                    display:flex;
                    align-items:center;
                    justify-content:right;
                }
                .section-right button{
                    width:auto !important;
                }
                 .notification-card{
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
            .btnDiv{
            gap:10vw !important;
            }
            .btnDiv button{
                margin-right:2vw;
            }
            `}
        </style>
        <Nav></Nav>
        <main>
            <div className="section-right">
                {!myRequests && <button onClick={() => setmyRequests(!myRequests)}>Requests Sent Status</button> }
                {myRequests && <button onClick={e=>setmyRequests(!myRequests)}>Requests Recieved</button> }
            </div>
            <div className="requests-section">
            <h2>{!myRequests && "Your Latest Requests!"} {myRequests && "Request's you've sent!"}</h2>
                {!myRequests && (
                
                        <div className="container">

                        
                        {NewNotificationsData && NewNotificationsData.length > 0 ? (
                            NewNotificationsData.map((ele) => (
                                <div key={ele._id} className="notification-card">
                                    <div className="img-container">
                                    <img src={ele.RequesterImg} alt="notthere" />
                                </div>
                                <div className="text-container">
                                    <p><b>{ele.RequesterName} • <small style={{color:"grey",marginLeft:"0vw"}}>{ele.RequesterCourse}</small></b></p>
                                    
                                
                                <div className="btnDiv">
                                    <button onClick={e=>acceptReq(ele._id)} style={{border:" 1px solid #10A37F", color:"#10A37F", background:"transparent"}}>accept</button>
                                    <button onClick={e=>reject(ele._id)} style={{border:"1px solid #ef4444",color:"#ef4444",background:"transparent"}}>reject</button>
                                </div>
                                    
                                </div>
                                   
                                    
                                    <br />
                                </div>
                            ))
                        ) : (
                            <>
                            <center>
                                <LamePage
                                title="Nothing Found!"
                                description="You havent recived any requests :)"
                                url="./"
                                btnContent="Find Folks."
                                />
                            </center>
                            </>
                        
                        )}
                        </div>

                )}

                {myRequests && 
                    <>
                        {PendingData?.length > 0 ? (
                            PendingData.map((ele) => (
                                <div key={ele._id} className="notification-card">
                                    <div className="img-container">
                                    <img src={ele.PosterImg} alt="notthere" />
                                </div>
                                <div className="text-container">
                                    <p><b>{ele.PosterName} • <small style={{color:"grey",marginLeft:"0vw"}}>{ele.PosterCourse}</small></b></p>
                                    
                                
                                <div className="btnDiv">
                                    <button onClick={e=>withdraw(ele._id)} style={{border:"1px solid #ef4444",color:"#ef4444",background:"transparent"}}>Withdraw</button>
                                </div>
                                    
                                </div>
                                   
                                    
                                    <br />
                                </div>
                        ))) : (
                            <LamePage
                                title="Nothing Found!"
                                    description="You dont have any active requests :)"
                                url="./"
                                btnContent="Find Folks."
                            />
                        )}
                    </>
                }

            </div>




       
        </main>
        </>
    )
}
}

export default Notifications