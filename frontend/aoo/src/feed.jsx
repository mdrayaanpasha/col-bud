import axios from "axios";
import { useEffect, useState } from "react";
import logo from "./assets/logo-dark-removebg-preview.png"

function Feed() {
    const [feedData, setFeedData] = useState(null);
    const [UserData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedData = async () => {
            try {
                const response = await axios.post("http://localhost:9090/feedPage", {
                    email: localStorage.getItem("E#M")
                });
                setFeedData(response.data.D); // Assuming 'D' is the key for the refined data in your backend response
                setUserData(response.data.UI); // Assuming 'D' is the key for the refined data in your backend response
                
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching feed data:", error);
                setError("Failed to fetch feed data. Please try again.");
            }
        };

        fetchFeedData();
    }, []);

    const handleConnect  = async (ele)=>{
        const Email = localStorage.getItem("E#M");
        if (!Email){
            alert("Your not signed in!")
            return 
        }
        const Data = {
            post_id:ele._id,
            PosterEmail:ele.email,
            PosterName:ele.name,
            RequesterEmail:Email,
            RequesterName:UserData.name,
            Status:false
        }
       
        try {
            const D = await axios.post("http://localhost:9090/ConnectRequest",{D:Data})
            if(D.data.message==="THERE"){
                alert("YOU ALREADY HAVE A REQUEST TO THIS PERSON!")
            }else if(D.data.message==="CREATED"){
                alert("CREATED")
            }else{
                alert("problem in backend")
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <>
        <style>
            {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            body{
                background:#0A0A0A;
                color:white;
                font-family:Poppins;
            }
            nav{
            position:fixed;
            top:0;
            height:100%;
            width:30vw;
            align-items:center;
            justify-content:space-evenly;
            }
            nav img{
            height:12vh;
            margin-left:1vw;
            }
           
            nav h3{
            color:#FF5722;
            }
            hr{
            margin-top:0;
          
            border:none;
            border:1px solid grey;
            }
            .con p{
            margin:0;
            }
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
            main{
            margin-top:5vh;
            position:absolute;
            left:20%;
            background:#181818;
            width:70vw;
            padding:2vw;
            border-radius:1vw;
            min-height:200vh;
            }
            .nav-div{
            gap:5vh !important;
            
            }
            .nav-div .i{
                margin-top:6vh;
                margin-left:2vw;
                
                color:grey;
                width:15vw;
                margin-right:2vw;
                margin-left:2vw;
                gap:2vw !important;
                margin-left:2.5vw;
            }
                .nav-div .i span{
                font-size:2.5vh !important;
                }

            `}
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <nav>
                <img src={logo} alt="" />
                {UserData &&

                <div className="nav-div" >
                <div className="i" style={{fontSize:"3vh", cursor:"pointer", fontFamily:"Poppins", background:"#181818", padding:"1vw", borderRadius:'1vw', color:"white",marginLeft:"1.5vw"}}>
    <i className='fa fa-home'></i>
    <span> Home</span>
    <br />
</div>

<div className="i" style={{fontSize:"3vh", cursor:"pointer", fontFamily:"Poppins"}}>
    <i className='fa fa-university'></i>
    <span> {UserData.college.toUpperCase()} Zone</span>
    <br />
</div>

<div className="i" style={{fontSize:"3vh", cursor:"pointer", fontFamily:"Poppins"}}>
    <i className='fa fa-map-pin'></i>
    <span> {UserData.area} Zone</span>
    <br />
</div>

<div className="i" style={{fontSize:"3vh", cursor:"pointer", fontFamily:"Poppins"}}>
    <i className='fa fa-user'></i>
    <span> My Profile</span>
    <br />
</div>

<div className="i" style={{fontSize:"3vh", cursor:"pointer", fontFamily:"Poppins"}}>
    <i className='fa fa-bell'></i>
    <span> Notifications</span>
    <br />
</div>



                </div>
            }

            <div className="logout" style={{position:"fixed",top:"90%",marginLeft:"1.5vw"}}>
                <button>Logout</button>
            </div>

              

            </nav>
            <main>
            
            {error && <p>{error}</p>}
            <div className="sticky">
            {UserData && <center style={{position:"fixed",top:"5%",right:"40%",background:"#0A0A0A",padding:"0.5vw",borderRadius:"1vw"}}><p style={{fontWeight:"bold",textAlign:"center",margin:"0"}}> {UserData.area} @  {UserData.college.toUpperCase()}.</p></center>}
            </div>
            {feedData ? (
                feedData.map((ele, index) => (
                    <>
                    <div key={index} className="post">
                        <div className="img-container">
                            <img src={ele.selectedImg} alt="notthere" />
                        </div>
                        <div className="text-container">
                            <p><b>{ele.name}     <small style={{color:"grey",marginLeft:"2vw"}}>{ele.course}</small></b></p>
                            
                           
                            <p>{ele.Description}</p>
                            <button onClick={() => handleConnect(ele)}>Connect</button>
                            
                        </div>
                        
                        
                        
                    </div>
                    <hr />
                    </>
                ))
            ) : (
                <p>Loading...</p>
            )}
            </main>
        </>
    );

    
}

export default Feed;
