import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../utils/constants"


const Connections = () => {
  const [connection,setConnection] = useState([])
   const getConnections = async() => {
      const res = await axios.get(
        BASE_URL+"user/connections",
        {withCredentials:true}
      )
      console.log(res.data)
    setConnection(res.data.data)    }
  useEffect(()=>{
   getConnections()
  },[])
  const removeConnection= async(connectionId)=>{
try{
await axios.post(
  BASE_URL+"request/removeconnection/"+connectionId,
  {},
  {withCredentials:true}
)
const newConnections = connection.filter((c)=>c._id !== connectionId)
setConnection(newConnections)
}catch(err){
console.log(err)
}
  }
  return (
    (connection.length===0)?<div>You have no Connections</div>:
    connection.map((e)=><div key={e._id} className="w-140 m-5 mx-120">
      <div className="card card-side bg-base-300 shadow-sm">
  <figure>
    <img
      src={e.photoUrl}
      alt="Movie" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{e.firstName+" "+e.lastName}</h2>
    <p>{e.about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={()=>removeConnection(e._id)}>Remove Connection</button>
    </div>
  </div>
</div>
    </div>)
    
  )
}

export default Connections