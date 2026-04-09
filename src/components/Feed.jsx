import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../../utils/constants'
import { addFeed } from '../../utils/feedSlice'
import UserCard from './UserCard'
import Shimmer from './Shimmer'

const Feed = () => {

  const dispatch = useDispatch()
  const fetchFeed = async() =>{
    try{
          const res = await axios.get(
      BASE_URL+"user/feed",
      {withCredentials:true}
    )
    console.log(res)
    dispatch(addFeed(res.data))

  }catch(err){
    return err
  }
  }
  useEffect(()=>{
fetchFeed()
  },[])
    const user = useSelector((store)=>store.feed.data)
  
  return (
 (!user)?<Shimmer />:
    <div className='flex justify-center my-12'>
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
  
}

export default Feed