import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../../utils/userSlice"
import { useNavigate } from "react-router-dom"


const Login = () => {
const [emailId,SetEmailId] = useState("lukadoncic@gmail.com")
const [password,SetPassword] = useState("Lukadoncic@123")
const dispatch = useDispatch()
const navigate = useNavigate()

const loginUser = async() =>{
    const res = await axios.post(
        "http://localhost:3000/login", 
    {emailId,password},
{withCredentials:true})

dispatch(addUser(res.data))
navigate("/")
}

  return (
    <div className='flex justify-center my-20'>
<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
  <legend className="fieldset-legend mx-auto">Login</legend>

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" value={emailId} onChange={(e)=>{SetEmailId(e.target.value)}} />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>{SetPassword(e.target.value)}} />

  <button className="btn btn-neutral mt-4" onClick={loginUser}>Login</button>
</fieldset>
</div>
  )
}

export default Login