import axios from "axios";
import { useState, useEffect } from "react";
import Nav from "./nav";
import LamePage from "./lame";
import defImg from "./assets/def.png"

function AreaZone() {
    const Email = localStorage.getItem("E#M");
    const [postData, setPostData] = useState(null);

    // Fetch post data
    const fetchData = async () => {
        try {
            const response = await axios.post("http://localhost:9090/getAreaPost", { Em: Email });
            
            // Check if response is successful
            if (response.data && response.data.message) {
                setPostData(response.data.D); // Assuming response contains post data directly
            } else {
                alert("There was an error fetching data from the backend!");
            }
        } catch (error) {
            console.log("Error: ", error);
            alert("There was an error fetching data from the backend!");
        }
    };

    // Fetch data once when the component mounts
    useEffect(() => {
        if (Email) {
            fetchData(); // Call the function to fetch data if email exists
        }
    }, [Email]);

    // Conditional rendering: Show posts if email exists
    if (!Email) {
        return <p>Please log in to view posts.</p>;
    }

    return (
        <>
        <style>
            {`
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
            `}
        </style>
        <Nav pageName={'areaZone'}></Nav>
        <main>
        {postData && postData.length > 0 ? (
                postData.map(ele=>(
                    <>
                    <div className="post-card">
                        <div className="image-section">
                            <img src={ele.An ? defImg : ele.Img} />
                        </div>
                        <div className="description-section">
                            <div className="upper-section">
                                <p onClick={e=>window.location.href=`./userProf?id=${ele._UserId}`}>{ele.An ? "Annoynous User" : ele.UserName}</p>
                                <p style={{color:"grey",fontWeight:"bold"}}>{ele.An ? "" : ele.Course}</p>
                            </div>
                            <div className="lower-section">
                                <p>{ele.Desc}</p>
                                {ele.Re ? <button onClick={e=>window.location.href=`./area-reply?id=${ele._id}`}>Reply</button> : null}
                            </div>
                        </div>
                    </div>
                    <hr />
                    </>
                ))
            ) :(
                <>
                <LamePage
                    title="No Posts Found!"
                    description="You Can Post Stuff Anytime :)"
                    url="./areapost"
                    btnContent="Post Now!"
                />
                </>
            )}
        </main>
        </>
    );
}

export default AreaZone
