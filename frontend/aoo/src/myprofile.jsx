import axios from "axios";
import { useEffect, useState } from "react";

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
            {MyData && 
            <>
                <p>{MyData.name}</p>
                <p>{MyData.college}</p>
                <p>{MyData.course}</p>
                <p onClick={showConnections}>connections: {MyData.Connections.length}</p>
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
        </>
    );
}

export default MyProfile;
