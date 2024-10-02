import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "./nav";
import defImg from "./assets/def.png"

function MyProfile() {
    const [MyData, setMyData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [connections, setConnections] = useState([]);
    const Email = localStorage.getItem("E#M");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:9090/getMyInfo", { email: Email });
                if (response.data.message) {
                    setMyData(response.data.D);
                    setConnections(response.data.D.Connections || []); // Initialize connections
                } else {
                    alert("There is an error in frontend");
                }
            } catch (error) {
                alert("There is an error in backend");
                console.log(error);
            }
        };

        if (Email) {
            fetchData();
        }
    }, [Email]);

    const removeConnections = async (email)=>{
        const D = {
            OtherEmail:email,
            MyEmail:Email
        }
        try {
            const response = await axios.post("http://localhost:9090/deleteConnections",{Data:D});
            if(response.data.message){
                alert("removed successfully!")
            }else{
                alert("there is some error in frontend!")
            }

        } catch (error) {
            alert("some error in backend")
            console.log(error)
        }
    }

    const [ConnectionsInfo,setConnectionInfo]=useState(null)
    useEffect(() => {
        const fetchData = async () => {
            if (showModal && connections) {
                try {
                    const response = await axios.post("http://localhost:9090/GiveConnectionsInfo", { Connections: connections });
                    if (!response.data.message) {
                        alert("There is a problem in the backend");
                    }else{
                        setConnectionInfo(response.data.Data)
                    
                    }
                } catch (error) {
                    console.error(error);
                    alert("There is a problem in the frontend");
                }
            }
        };
    
        fetchData();
    }, [showModal, connections]);


    const [userPostData,setUserPostData] = useState(null)
    useEffect(()=>{

        const fetchMyPost = async ()=>{
            if(MyData){
                try {
                    const response = await axios.post("http://localhost:9090/fetchUserPost",{Id:MyData._id});
                    if(response.data.message){
                        setUserPostData(response.data.Data)
                        console.log(response.data.Data)
                    }else{
                        alert("error in backend")
                    }
                } catch (error) {
                    console.log(error)
                    alert("error in frontend")   
                }
            }
        }
        fetchMyPost()
        
    },[MyData])

    const showConnections = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const UserPage = (id)=>{
        alert(id)
    }

    if (!Email) {
        return (
            <>
                You haven't registered yet!
                <button onClick={e => window.location.href = "./reg"}>Register</button>
                <button onClick={e => window.location.href = "./login"}>Login</button>
            </>
        );
    }

    const DeleteCollegePost = async(d)=>{
        console.log("Data from delete: ",d);
        try {
            const response = await axios.post("http://localhost:9090/deleteCollegePost",{id:d});
            if(response.data.message){
                alert("deleted");
                window.location.href="./myprofile";
            }else{
                alert("there is some internal error! ERR: BE");
            }
        } catch (error) {
            alert("ERR: FE")
            console.log(error);
        }

    }

    const DeleteAreaPost = async(d)=>{
        console.log("Data from delete: ",d);
        try {
            const response = await axios.post("http://localhost:9090/DeleteAreaPost",{id:d});
            if(response.data.message){
                alert("deleted");
                window.location.href="./myprofile";
            }else{
                alert("there is some internal error! ERR: BE");
            }
        } catch (error) {
            alert("ERR: FE")
            console.log(error);
        }

    }
    return (
        <>
        <style>
            {`
                .section-1{
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    flex-direction:column;
                    padding:5vh;
                }
                .image-container img{
                    height:10vw;
                    border-radius:50%;
                }
                .details-section{
                    padding:2vw;
                    display:flex;
                    align-items:center;
                    justify-content:space-evenly;
                    gap:2vw;
                }
                .detail-card p, .detail-card small{
                    margin:0;
                    padding:0;
                    text-align:center;
                    font-weight:bold;
                    font-size:2vh;
                }
                .detail-card small{
                    text-align:center;
                    color:grey;
                    font-size:1.5vh !important;
                    font-weight:normal !important;

                }
                .Connections-modal{
                    position:fixed;
                    top:0;
                    min-width:100vw;
                    overflow:scroll;
                    height:100vh;
                    background-color:black;
                    color:white;
                    border:none;
                }
                .connection-card, .modal-heading{
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    padding:1vw;
                }
                .image-name-section{
                    display:flex;
                    align-items:center;
                    gap:4vw;
                }
                .image-name-section img{
                    height:10vh;
                    border-radius:50%;
                }
                .button-section button{
                    background:black;
                    border:1px solid red;
                    color:red;
                }
                .modal-heading button{
                    border:none;
                    background:none;
                }
                .Connection-container{
                    padding:3vw;
                }
                .post-card{
                    display:flex;
                    gap:2vw;
                    padding:2vw;
                }
                .image-section img{
                    height:10vh;
                    border-radius:50%;
                }
                .upper-section{
                    display:flex;
                    gap:2vw;
                }
                .all-posts-container{
                    padding:2vw;
                }

            `}
        </style>
        <Nav pageName="profile"></Nav>
        <main>
            {/* i need few section.
            section 1 is where we show the username connections and other things.
            section 2 is show my posts. */}

            {/* post section */}
            <div className="div-post-stuff" style={{display:"flex",justifyContent:"right"}}>
            <button 
                onClick={e => window.location.href = "./post"} 
                style={{
                    backgroundColor: "transparent", 
                    border: "1px solid white", 
                    color: "white", 
                    padding: "10px 20px", 
                    borderRadius: "5px", 
                    cursor: "pointer"
                }}
            >
                Post
            </button>
            </div>
            {/* section 1 */}

            {MyData && 
            <>
                <div className="section-1">
                    <div className="image-container">
                        <img src={MyData.selectedImg} alt="" />
                    </div>

                    <div className="details-section">
                        <div className="detail-card">
                            <p>{MyData.name}</p>
                            <center><small>Name</small></center>
                        </div>
                        <div className="detail-card">
                            <p>{MyData.college.toUpperCase()}</p>
                            <center><small>College</small></center>
                        </div>
                        <div className="detail-card">
                            <p>{MyData.course}</p>
                            <center><small>Course</small></center>
                        </div>
                        <div className="detail-card" onClick={showConnections} style={{cursor:"pointer"}}>
                            <p>{MyData.Connections.length}</p>
                            <center><small>Connections</small></center>
                        </div>
                        

                    </div>

                    <div className="button-section">
                        <button className="theme-btn">Edit Profile</button>
                    </div>
                </div>

                <div className="post-section">
                    <h4>Your Posts</h4>

                    <div className="all-posts-container">
                    <div className="area-posts">
                        <h5>Area Posts</h5>
                        {userPostData && userPostData.AreaPosts && userPostData.AreaPosts.length > 0 ? (
                            userPostData.AreaPosts.map((ele, index) => (
                                <>
                                <div className="post-card">
                        <div className="image-section">
                            <img src={ele.An ? defImg : ele.Img} />
                        </div>
                        <div className="description-section">
                            <div className="upper-section">
                                <p style={{fontWeight:"bold"}} onClick={e=>window.location.href=`./userProf?id=${ele._UserId}`}>{ele.An ? "Annoynous User" : ele.UserName}</p>
                                <small style={{color:"grey"}}>{ele.An ? "" : ele.Course}</small>
                                <small style={{color:"red",cursor:"pointer"}} onClick={e=>DeleteAreaPost(ele._id)}>Delete</small>
                            </div>
                            <div className="lower-section">
                                <p style={{color:"grey"}}>{ele.Desc}</p>
                                {ele.Re ? <button onClick={e=>window.location.href=`./area-reply?id=${ele._id}`}>Replies</button> : null}
                            </div>
                        </div>
                    </div>
                    <hr />
                    </>

                    
                            ))
                        ) : (
                            <p>No posts available.</p> // Optional message when there are no posts
                        )}
                    </div>


                    <div className="area-posts">
                        <h5>College Posts</h5>
                        {userPostData && userPostData.CollegePosts && userPostData.CollegePosts.length > 0 ? (
                            userPostData.CollegePosts.map((ele, index) => (
                                <>
                                <div className="post-card">
                        <div className="image-section">
                            <img src={ele.An ? defImg :  ele.Img} />
                        </div>
                        <div className="description-section">
                            <div className="upper-section">
                                <p style={{fontWeight:"bold"}} onClick={e=>window.location.href=`./userProf?id=${ele._UserId}`}>{ele.An ? "Annoynous User" : ele.UserName}</p>
                                <small style={{color:"grey"}}>{ele.An ? "" : ele.Course}</small>
                                <small style={{color:"red",cursor:"pointer"}} onClick={e=>DeleteCollegePost(ele._id)}>Delete</small>
                            </div>
                            <div className="lower-section">
                                <p style={{color:"grey"}}>{ele.Desc}</p>
                                {ele.Re ? <button onClick={e=>window.location.href=`./college-reply?id=${ele._id}`}>Replies</button> : null}
                            </div>
                        </div>
                    </div>

                    <hr />
                    </>
                            ))
                        ) : (
                            <p>No posts available.</p> // Optional message when there are no posts
                        )}
                    </div>
                    </div>
                </div>

                
                
            </>
            }

            {showModal && (
                <dialog open className="Connections-modal">
                    <div className="modal-heading">
                        <h3>Your Connections</h3>
                        <button onClick={closeModal}>❌</button>
                    </div>
                    
                    {ConnectionsInfo && ConnectionsInfo.length > 0 ? (
                        <div className="Connection-container">
                            {ConnectionsInfo.map((conn, index) => (
                                <>
                                <div key={index} className="connection-card" onClick={e=>UserPage(conn._id)} style={{cursor:"pointer"}}>
                                    <div className="image-name-section">
                                        <img src={conn.selectedImg} alt="" />
                                        <p>{conn.name}</p>
                                    </div>
                                    <div className="button-section">
                                        <button onClick={e=>removeConnections(conn.email)}>Remove</button>
                                    </div>
                                </div>
                                <hr />
                                </>
                                
                            ))}
                        </div>
                    ) : (
                        <p>Sorry, you don't have any connections.</p>
                    )}
                </dialog>
            )}
            </main>
        </>
    );
}

export default MyProfile;
