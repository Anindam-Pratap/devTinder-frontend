import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../../utils/constants"


const Login = () => {
const [emailId,SetEmailId] = useState("nikolajokic@gmail.com")
const [password,SetPassword] = useState("Nikolajokic@123")
const [error,setError] = useState("")
const dispatch = useDispatch()
const navigate = useNavigate()

const loginUser = async() =>{
  try{
    const res = await axios.post(
        BASE_URL+"login", 
    {emailId,password},
{withCredentials:true})

dispatch(addUser(res.data))
navigate("/")
    }catch(err){
     setError(err.message)
    }
}

  return (
    <div className='flex justify-center my-20'>
<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
  <legend className="fieldset-legend mx-auto">Login</legend>

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" value={emailId} onChange={(e)=>{SetEmailId(e.target.value)}} />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>{SetPassword(e.target.value)}} />
<p className="text-amber-700">{error}</p>
  <button className="btn btn-neutral mt-4" onClick={loginUser}>Login</button>
</fieldset>
</div>
  )
}

export default Login