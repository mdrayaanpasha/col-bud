import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "./nav";

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

    const showConnections = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (!Email) {
        return (
            <>
                You haven't registered yet!
                <button onClick={e => window.location.href = "./reg"}>Register</button>
                <button onClick={e => window.location.href = "./login"}>Login</button>
            </>
        );
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
            `}
        </style>
        <Nav pageName="profile"></Nav>
        <main>
            {/* i need few section.
            section 1 is where we show the username connections and other things.
            section 2 is show my posts. */}


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
                        <div className="detail-card" onClick={showConnections}>
                            <p>{MyData.Connections.length}</p>
                            <center><small>Connections</small></center>
                        </div>
                        

                    </div>

                    <div className="button-section">
                        <button>Edit Profile</button>
                    </div>
                </div>
                
                
            </>
            }

            {showModal && (
                <dialog open>
                    <h3>Your Connections</h3>
                    {connections.length > 0 ? (
                        <ul>
                            {connections.map((conn, index) => (
                                <li key={index}>
                                    <p>{conn}</p>
                                    <button onClick={e=>removeConnections(conn)}>Remove</button>
                                </li>
                                
                            ))}
                        </ul>
                    ) : (
                        <p>Sorry, you don't have any connections.</p>
                    )}
                    <button onClick={closeModal}>Close</button>
                </dialog>
            )}
            </main>
        </>
    );
}

export default MyProfile;
