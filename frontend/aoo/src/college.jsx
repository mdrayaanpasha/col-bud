import axios from "axios";
import { useState, useEffect } from "react";

function College() {
    const Email = localStorage.getItem("E#M");
    const [postData, setPostData] = useState(null);

    // Fetch post data
    const fetchData = async () => {
        try {
            const response = await axios.post("http://localhost:9090/getcolpost", { Em: Email });
            
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
            <p>Welcome to College Zone</p>
            {postData && postData.length > 0 ? (
                



                postData.map(ele=>(
                    <>
                    <p>{ele.College}</p>
                    <p onClick={e=>window.location.href=`./userProf?id=${ele._UserId}`}>{ele.An ? "Annoynous User" : ele.UserName}</p>
                    <p>{ele.Course}</p>
                    {ele.Re ? <a href={`./reply?id=${ele._id}`}>Click here to reply</a> : null}
                    <p>{ele.Desc}</p>
                    <p></p>
                    </>
                ))
            ) :(
                <>
                <p>sorry no one in your college has posted anything yet!</p>
                </>
            )}
        </>
    );
}

export default College;
