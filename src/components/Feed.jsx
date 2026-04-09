import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../../utils/constants'
import { addFeed } from '../../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const user = useSelector((store)=>store.feed?.data?.data)
  const dispatch = useDispatch()
  const fetchFeed = async() =>{
    try{
          const res = await axios.get(
      BASE_URL+"user/feed",
      {withCredentials:true}
    )
    console.log(res)
    dispatch(addFeed(res))

  }catch(err){
    return err
  }
  }
  useEffect(()=>{
fetchFeed()
  },[])
  
  return (
(user &&
    <div className='flex justify-center my-16'>
      <div className="carousel rounded-box w-96">
{user.map((e)=>(
  <div className='carousel-item'>
 <UserCard key={e._id} user={e} />
 </div>
))
}
  </div>
    </div>
)
  )
}

export default Feed