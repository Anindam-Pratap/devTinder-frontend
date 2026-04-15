import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../utils/userSlice'

const Body = () => {
    const userData = useSelector((store)=>store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
   const fetchUser = async () => {
  if (userData && userData._id) return;

  try {
    const user = await axios.get(BASE_URL + "profile/view", {
      withCredentials: true,
    });

    dispatch(addUser(user.data));
  } catch (err) {
    if (err.response?.status === 401) {
      // not logged in → ignore
      return;
    } else {
      navigate("/error");
    }
  }
};

    useEffect(()=>{
        fetchUser()
    },[])
  return (
    <div className="min-h-screen flex flex-col relative">
  
  {/* Background */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-40"
    style={{ backgroundImage: "url('/background.png')" }}
  />

  {/* Content */}
  <div className="relative z-10 flex flex-col min-h-screen">
    <NavBar />
    <Outlet />
    
  </div>

</div>
  )
}

export default Body