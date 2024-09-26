import { useState } from "react"
import i1 from "./assets/a-img.jpg"
import i2 from "./assets/m-img.jpg"
import i3 from "./assets/s-img.jpg"
import i4 from "./assets/si-img.jpg"
import i5 from "./assets/z-img.jpg"
import i6 from "./assets/r-img.jpg"
import def from "./assets/def.png"
import logo from "./assets/logo.png"
import cover from "./assets/reg.jpeg"
import axios from "axios"

function Login(){

    
    const [password,setPassword]=useState(null)
    const [email,setEmail]=useState(null)



    const submitForm = async (e)=>{
        const Data = {
           
            
            email:email,
            password:password,
        }
        try {
            const resp = await axios.post("http://localhost:9090/logUser", { D: Data });
            if (resp.data.message === "done") {
                alert("Login successful!");
                localStorage.setItem("E#M",Data.email)
                window.location.href="/"
            }else if(resp.data.message === "wrong") {
                alert("Wrong Password")
            }else if(resp.data.message === "not"){
                alert("this email doesnt exist in our system, please log in!")
            }
            else {
                alert("Error in backend");
            }
        } catch (error) {
            console.log(error);
            alert("Error in frontend!");
        }
        
    }


    return(
        <>
        <style>
            {
                `
                .container-f{
                    display:flex;
                    
                    justify-content:space-between;
                    margin-bottom:5vh;
                }
                .section-1 img{
                width:45vw;
                height:100vh;
                object-fit:cover;
                }
                .section-2 img{
                    height:20vh;

                }
                .section-2 input, .section-2 select, .section-2 .btn, .section-2{
                    width:45vw;
                }
                    .section-2{
                    margin-right:5vw;
                    }
                    
                }
                .container-f img{
                    height:20vh;
                    
                }
                select{
                margin-bottom:3vh;
                }
                
                .btn{
                margin-top:2vh;
                background-color:#FF5722;
                border:2px solid #FF5722 !important;
                font-weight:bolder;
                }
                .btn:hover{
                background:white;
                color:#FF5722;
                }
                .con-1-p{
                    display:flex;
                    align-items:center;
                    gap:2vw;
                }
                .selectedimg{
                border:1px solid #FF5722;
                padding:0.1vw;
                }

                    .des p{
                    margin:0;
                    }
                @media(max-width:900px){
                    .section-1{
                    display:none;
                    }
                    .container-f{
                    margin-left:10vw;
                    }
                    .section-2 input, .section-2 select, .section-2 .btn, .section-2{
                        width:75vw;
                    }
                    .container img{
                        width:7.5vw !important;
                        height:10vh !important;
                    }

                    
                    
                }
                @media(max-width:700px){
                    .container img{
                        width:10vw !important;
                        height:10vh !important;
                    }
                    .container{
                    gap:2vw;
                    }
                }
                @media(max-width:380px){
                    .section-2 input, .section-2 select, .section-2 .btn, .section-2{
                        width:90vw;
                    }
                    .container-f{
                        margin-left:5vw;

                    }
                        .selectedimg{
                border:1px solid #FF5722;
                padding:0.5vw;
                }
                        .container{
                        flex-wrap:wrap;
                        }
                    .container img{
                        width:20vw !important;
                        height:12vh !important;
                    }
                        
             
                }
                
                `
            }
        </style>
        <div className="container-f">
            <div className="section-1">
                <img src={cover} alt="" />
            {/* <center><h3 style={{color:"orange",marginTop:"2vh"}}>Your Profile!</h3></center> */}
        
            </div>
            <div className="section-2">
        <center><img src={logo} alt="" /><br /><h2 style={{color:"#FF5722"}}>Welcome Back!</h2></center> 
        
        <div class="mb-3" onChange={e=>setEmail(e.target.value)}>
            <label for="email" class="form-label">Enter your email</label>
            <input type="email" class="form-control" name="email" />
        </div>

        <div class="mb-3" onChange={e=>setPassword(e.target.value)}>
            <label for="password" class="form-label">Enter your password</label>
            <input type="password" class="form-control" name="password" />
        </div>

       


        

        

        <input type="submit" className="btn btn-primary" value="Login!" onClick={e=>submitForm()} />
        <center><a href="./login" style={{color:"#FF5722",marginTop:"10vh",textDecoration:"none"}}>Don't have an Account? Register!</a></center>
        </div>
        </div>
        </>
    )
}

export default Login