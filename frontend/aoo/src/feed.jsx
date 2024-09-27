import axios from "axios";
import { useEffect, useState } from "react";
import logo from "./assets/logo-dark-removebg-preview.png"
import Nav from "./nav";

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
          

            `}
        </style>
        <Nav pageName="home"></Nav>
      
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
