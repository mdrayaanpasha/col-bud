import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from './home';
import Register from './reg';
import Login from './login';
import Feed from './feed';
import Notifications from './notifications';
import MyProfile from './myprofile';
import Colpost from './colpost';
import College from './college';
import Reply from './reply';
import AreaZone from './areazone';
import AreaPost from './areapost';
import AreaReply from './areaReply';

function App(){
  return(
    <>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <BrowserRouter>
    <Routes>
      
        <Route index path='/' element={<Home />} />
        <Route index path='/reg' element={<Register />} />
        <Route index path='/login' element={<Login />} />
        <Route index path='/feed' element={<Feed />} />
        <Route index path='/notifications' element={<Notifications />} />
        <Route index path='/myprofile' element={<MyProfile />} />
        <Route index path='/post' element={<Colpost />} />
        <Route index path='/collegezone' element={<College />} />
        <Route index path='/reply' element={<Reply />} />
        <Route index path='/areazone' element={<AreaZone />} />
        <Route index path='/areapost' element={<AreaPost />} />
        <Route index path='/area-reply' element={<AreaReply />} />
       
        
   
    </Routes>
  </BrowserRouter>
    
    </>
  )
}

export default App