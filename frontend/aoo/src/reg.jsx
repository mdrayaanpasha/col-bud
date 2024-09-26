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

function Register(){

    const [Name,setName] = useState(null)
    const [password,setPassword]=useState(null)
    const [email,setEmail]=useState(null)

    const [college,setCollege] = useState(null)
    const [area,setArea] = useState(null)
    const [course,setCourse] = useState(null)
    const [Description,setDescription] = useState(null)
    const [selectedImg,setSelectedImg] = useState(def)

    const submitForm = async (e)=>{
        const Data = {
            name:Name,
            password:password,
            email:email,
            area:area,
            college:college,
            course:course,
            Description:Description,
            selectedImg:selectedImg,
            Connections:[]
        }
        try {
            const resp = await axios.post("http://localhost:9090/registerUser", { D: Data });
            if (resp.data.message === "made") {
                alert("Registration successful!");
                localStorage.setItem("E#M",Data.email)
                window.location.href="/"
            }else if(resp.data.message === "exist") {
                alert("account with same email exist! try loggin in!")
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
                .profile{
                margin-top:3vh;
                margin-left:2vw;
                width:38vw;
                border:1px solid #FF5722;
                padding:1vw;
                border-radius:0.5vw;
                }
                .profile img{
                    width:5vw;
                    height:10vh;
                    border-radius:50%;
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
                border:1px solid orange;
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
        <div className="profile">
            <div className="con-1-p">
            <img src={selectedImg} alt="" />
            <div className="des">
            <p style={{fontWeight:"bold"}}>{Name} </p>
            <small>{college && college.toUpperCase()} | {course && course.toUpperCase().replace(/_/g, ' ')} | {area && area.toUpperCase()}</small>
            </div>
            </div>
            <hr />
            
            <p>{Description}</p>
        </div>
            </div>
            <div className="section-2">
        <center><img src={logo} alt="" /><br /><h2>Register!</h2></center> 
        <div class="mb-3">
            <label for="name" class="form-label">Enter Name</label>
            <input type="text" class="form-control" name="name" onChange={e=>setName(e.target.value)}/>
        </div>
        <label for="name" class="form-label">Select Your College</label>
        <select class="form-select" aria-label="Default select example" onChange={e=>setCollege(e.target.value)}>
    <option selected>-Select Your College-</option>
    <option value="iisc">Indian Institute of Science (IISc)</option>
    <option value="rvce">RV College of Engineering</option>
    <option value="bmsce">BMS College of Engineering</option>
    <option value="msrit">MS Ramaiah Institute of Technology</option>
    <option value="pes">PES University</option>
    <option value="christ">Christ University</option>
    <option value="sju">St. Joseph's University</option>
    <option value="kjc">Kristu Jayanti College</option>
    <option value="presidency">Presidency University</option>
    <option value="alliance">Alliance University</option>
    <option value="reva">REVA University</option>
    <option value="bangalore">Bangalore University</option>
    <option value="dayananda">Dayananda Sagar College of Engineering</option>
    <option value="cmrit">CMR Institute of Technology</option>
    <option value="newhorizon">New Horizon College of Engineering</option>
    <option value="oxford">Oxford College of Engineering</option>
    <option value="sir">SIR M Visvesvaraya Institute of Technology</option>
    <option value="bnm">BNM Institute of Technology</option>
    <option value="cambridge">Cambridge Institute of Technology</option>
    <option value="eastwest">East West Institute of Technology</option>
    <option value="acharya">Acharya Institute of Management</option>
    <option value="ifim">IFIM College</option>
    <option value="ksit">KS Institute of Technology</option>
    <option value="vivekananda">Vivekananda Institute of Technology</option>
    <option value="sea">SEA College of Engineering</option>
    <option value="sces">SCES College of Engineering</option>
    <option value="sjm">SJ College of Management</option>
    <option value="gtc">GT College</option>
    <option value="jyoti-Nivas">Jyoti Nivas College</option>
    <option value="mount">Mount Carmel College</option>
    <option value="tjohn">T John College</option>
    <option value="eastpoint">East Point College of Engineering</option>
    <option value="hkbk">HKBK College of Engineering</option>
    <option value="sjbit">SJ Batra Institute of Management</option>
    <option value="garden">Garden City College</option>
    <option value="abhayapuri">Abhayapuri College of Engineering</option>
    <option value="nsb">NSB College</option>
   
</select>

<div class="mb-3">
    <label for="course" class="form-label">Enter Your Course</label>
    <select class="form-select" aria-label="Default select example" onChange={e => setCourse(e.target.value)}>
        <option selected>-Select Your Degree Program-</option>
        <option value="BCA">Bachelor of Computer Applications (BCA)</option>
        <option value="BSc_CS">Bachelor of Science in Computer Science (B.Sc. CS)</option>
        <option value="BTech_CS">Bachelor of Technology in Computer Science (B.Tech. CS)</option>
        <option value="BE_CS">Bachelor of Engineering in Computer Science (B.E. CS)</option>
        <option value="BA_Eco">Bachelor of Arts in Economics (B.A. Economics)</option>
        <option value="BA_Eng">Bachelor of Arts in English (B.A. English)</option>
        <option value="BA_PolSci">Bachelor of Arts in Political Science (B.A. Political Science)</option>
        <option value="BCom_Gen">Bachelor of Commerce (B.Com. General)</option>
        <option value="BCom_Hon">Bachelor of Commerce (Honours) (B.Com. Hons)</option>
        <option value="BBA">Bachelor of Business Administration (BBA)</option>
        <option value="BMS">Bachelor of Management Studies (BMS)</option>
        <option value="BHM">Bachelor of Hotel Management (BHM)</option>
        <option value="BDS">Bachelor of Dental Surgery (BDS)</option>
        <option value="MBBS">Bachelor of Medicine, Bachelor of Surgery (MBBS)</option>
        <option value="BPT">Bachelor of Physiotherapy (BPT)</option>
        <option value="BPharm">Bachelor of Pharmacy (B.Pharm)</option>
        <option value="BArch">Bachelor of Architecture (B.Arch)</option>
        <option value="BFA">Bachelor of Fine Arts (BFA)</option>
        <option value="LLB">Bachelor of Laws (LLB)</option>
        <option value="BSc_Phy">Bachelor of Science in Physics (B.Sc. Physics)</option>
        <option value="BSc_Math">Bachelor of Science in Mathematics (B.Sc. Mathematics)</option>
        <option value="BSc_Chem">Bachelor of Science in Chemistry (B.Sc. Chemistry)</option>
        <option value="BSc_Bio">Bachelor of Science in Biology (B.Sc. Biology)</option>
        <option value="BSc_Biotech">Bachelor of Science in Biotechnology (B.Sc. Biotechnology)</option>
        <option value="BSc_EnvSci">Bachelor of Science in Environmental Science (B.Sc. Environmental Science)</option>
        <option value="BSc_HomeSci">Bachelor of Science in Home Science (B.Sc. Home Science)</option>
        <option value="BSc_Agri">Bachelor of Science in Agriculture (B.Sc. Agriculture)</option>
        <option value="BSc_Nursing">Bachelor of Science in Nursing (B.Sc. Nursing)</option>
        <option value="BDes">Bachelor of Design (B.Des)</option>
        <option value="BFA">Bachelor of Fine Arts (BFA)</option>
        <option value="BEd">Bachelor of Education (B.Ed)</option>
        <option value="BSc_IT">Bachelor of Science in Information Technology (B.Sc. IT)</option>
        <option value="BSc_Elec">Bachelor of Science in Electronics (B.Sc. Electronics)</option>
        <option value="BSc_Stats">Bachelor of Science in Statistics (B.Sc. Statistics)</option>
        <option value="BBA_HM">Bachelor of Business Administration in Hospital Management (BBA HM)</option>
        <option value="BA_JMC">Bachelor of Arts in Journalism and Mass Communication (B.A. JMC)</option>
        <option value="BSc_Micro">Bachelor of Science in Microbiology (B.Sc. Microbiology)</option>
        <option value="BSc_FoodSci">Bachelor of Science in Food Science (B.Sc. Food Science)</option>
        <option value="BSc_Nutrition">Bachelor of Science in Nutrition (B.Sc. Nutrition)</option>
        <option value="BSc_Horti">Bachelor of Science in Horticulture (B.Sc. Horticulture)</option>
        <option value="BSc_Zoology">Bachelor of Science in Zoology (B.Sc. Zoology)</option>
        <option value="BSc_Geology">Bachelor of Science in Geology (B.Sc. Geology)</option>
        <option value="BTech_Mech">Bachelor of Technology in Mechanical Engineering (B.Tech. Mechanical)</option>
        <option value="BTech_Civil">Bachelor of Technology in Civil Engineering (B.Tech. Civil)</option>
        <option value="BTech_Elec">Bachelor of Technology in Electrical Engineering (B.Tech. Electrical)</option>
        <option value="BTech_ECE">Bachelor of Technology in Electronics and Communication Engineering (B.Tech. ECE)</option>
        <option value="BTech_Biotech">Bachelor of Technology in Biotechnology (B.Tech. Biotechnology)</option>
        <option value="BTech_Aero">Bachelor of Technology in Aeronautical Engineering (B.Tech. Aeronautical)</option>
        <option value="BTech_Chem">Bachelor of Technology in Chemical Engineering (B.Tech. Chemical)</option>
    </select>
</div>

<label for="name" class="form-label">Enter Your Area</label>
        <select class="form-select" aria-label="Default select example" onChange={e=>setArea(e.target.value)}>
    <option selected>-Select Your Area-</option>
    <option value="Shivajinagar">Shivajinagar</option>
<option value="Jayanagar">Jayanagar</option>
<option value="Koramangala">Koramangala</option>
<option value="HSR-Layout">HSR Layout</option>
<option value="Marathahalli">Marathahalli</option>
<option value="BTM-Layout">BTM Layout</option>
<option value="Rajarajeshwari-Nagar">Rajarajeshwari Nagar</option>
<option value="Banashankari">Banashankari</option>
<option value="Indiranagar">Indiranagar</option>
<option value="Yelahanka">Yelahanka</option>
<option value="Malleshwaram">Malleshwaram</option>
<option value="Vijayanagar">Vijayanagar</option>
<option value="Rajajinagar">Rajajinagar</option>
<option value="Banashankari">Banashankari</option>
<option value="Electronic-City">Electronic City</option>
<option value="HBR-Layout">HBR Layout</option>
<option value="Mysore-Road">Mysore Road</option>
<option value="Sarjapur-Road">Sarjapur Road</option>

</select>

        <div class="mb-3" onChange={e=>setEmail(e.target.value)}>
            <label for="email" class="form-label">Enter your email</label>
            <input type="email" class="form-control" name="email" />
        </div>

        <div class="mb-3" onChange={e=>setPassword(e.target.value)}>
            <label for="password" class="form-label">Enter your password</label>
            <input type="password" class="form-control" name="password" />
        </div>

        <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Write Something About Yourself, that we can show to your fellow mates.</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e=>setDescription(e.target.value)}></textarea>
</div>

<style>
    {`
    .container{
        display:flex;
        align-items:center;
        justify-content:space-evenly;
    }
    .container img{
        height:10vh;
        width:5vw ;
        object-fit:cover;
        border-radius:50%;
    }
    `}
</style>
<div>
    <p style={{fontWeight:"bold"}}>Select yourself one one of the Avatar.</p>
    
    <div className="container">
    <img src={def} onClick={e=>setSelectedImg(def)} className={selectedImg === def ? "selectedimg" : "img"} alt="" />
    <img src={i1} onClick={e=>setSelectedImg(i1)} className={selectedImg === i1 ? "selectedimg" : "img"} alt="" />
    <img src={i2} onClick={e=>setSelectedImg(i2)} className={selectedImg === i2 ? "selectedimg" : "img"} alt="" />
    <img src={i3} onClick={e=>setSelectedImg(i3)} className={selectedImg === i3 ? "selectedimg" : "img"} alt="" />
    <img src={i4} onClick={e=>setSelectedImg(i4)} className={selectedImg === i4 ? "selectedimg" : "img"} alt="" />
    <img src={i5} onClick={e=>setSelectedImg(i5)} className={selectedImg === i5 ? "selectedimg" : "img"} alt="" />
    <img src={i6} onClick={e=>setSelectedImg(i6)} className={selectedImg === i6 ? "selectedimg" : "img"} alt="" />
    </div>
    
</div>

        

        

        <input type="submit" className="btn btn-primary" value="Finalize & Register" onClick={e=>submitForm()} />
        <center><a href="./login" style={{color:"#FF5722",marginTop:"10vh",textDecoration:"none"}}>Already have an Account? Login!</a></center>
        </div>
        </div>
        </>
    )
}

export default Register