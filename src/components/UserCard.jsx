import React from 'react'
import { Link } from 'react-router-dom'


const UserCard = ({user,firstButton,secondButton,onFirstClick,onSecondClick}) => {

  const {firstName,lastName,about,photoUrl,gender,age,_id} = user
  return (
    <div>
         <div className="card bg-base-300 w-96 shadow-sm">
  <figure className='h-60'>
    <img
      src={photoUrl}
      alt="User Photo" />
  </figure>
  <p className='mx-6'>{age+","+gender}</p>
  <div className="card-body">
    <h2 className="card-title">
      {firstName+" "+lastName}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>{about}</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline bg-red-500"><button className='cursor' onClick={()=>onFirstClick(_id)}>{firstButton}</button></div>
      <div className="badge badge-outline bg-green-600"><button onClick={()=>onSecondClick(_id)}>{secondButton}</button></div>
    </div>
  </div>
</div>
    </div>
  )
}


export default UserCard