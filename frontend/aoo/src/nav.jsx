import axios from "axios";
import { useEffect, useState } from "react";
import logo from "./assets/logo-dark-removebg-preview.png";

function Nav({ pageName }) {
    const [UserData, setUserData] = useState(null);

    useEffect(() => {
        const fetchFeedData = async () => {
            try {
                const response = await axios.post("http://localhost:9090/feedPage", {
                    email: localStorage.getItem("E#M")
                });
                setUserData(response.data.UI); // Assuming 'D' is the key for the refined data in your backend response
                
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching feed data:", error);
            }
        };

        fetchFeedData();
    }, []);

    // Conditional ID based on the pageName prop
    

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
            left:25%;
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
                display:flex;
                align-items:center;
                
                margin-top:4vh;
                margin-left:2vw;
                font-size:3vh !important;
                padding:1vw;
                color:grey;
                width:20vw;
                margin-right:2vw;
                margin-left:2vw;
                gap:2vw !important;
                margin-left:2.5vw;
                cursor:pointer;
            }
                .nav-div .i span{
                font-size:2.5vh !important;
                }
            .main-style {
            display:flex;

    font-size: 3vh;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    background: #181818;
   
    border-radius: 1vw;
    color: white;

}


            `}
        </style>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

        <nav style={{color: "white"}}>
            <img src={logo} alt="logo" />

            {UserData && (
                <div className="nav-div">
                    <div
                        className={pageName === "home" ? "i main-style" : "i"}
                        onClick={e=>window.location.href="./feed"}
                    >

                        <i className='fa fa-home'></i>
                        <span> Home </span>
                        <br />
                    </div>

                    <div
                      
                        className={pageName === "collegeZone" ? "i main-style" : "i"}
                        style={{fontSize:"3vh", cursor:"pointer", fontFamily:"Poppins"}}
                        onClick={e=>window.location.href="./collegezone"}
                    >
                        <i className='fa fa-university'></i>
                        <span>{UserData.college.toUpperCase()} Zone</span>
                        <br />
                    </div>

                    <div
                        className={pageName === "areaZone" ? "i main-style" : "i"}
                        style={{fontSize:"3vh", cursor:"pointer", fontFamily:"Poppins"}}
                        onClick={e=>window.location.href="./areazone"}
                    >
                        <i className='fa fa-map-pin'></i>
                        <span>{UserData.area} Zone</span>
                        <br />
                    </div>

                    <div
                        className={pageName === "profile" ? "i main-style" : "i"}
                        style={{fontSize:"3vh", cursor:"pointer", fontFamily:"Poppins"}}
                        onClick={e=>window.location.href="./myprofile"}
                    >
                        <i className='fa fa-user'></i>
                        <span> My Profile</span>
                        <br />
                    </div>

                    <div
                        className={pageName === "notifications" ? "i main-style" : "i"}
                        style={{fontSize:"3vh", cursor:"pointer", fontFamily:"Poppins"}}
                        onClick={e=>window.location.href="./notifications"}
                    >
                        <i className='fa fa-bell'></i>
                        <span> Notifications</span>
                        <br />
                    </div>
                </div>
            )}

<div className="logout" style={{position:"fixed",top:"90%",marginLeft:"1.5vw"}}>
                <button>Logout</button>
            </div>
        </nav>
        </>
    );
}

export default Nav;
