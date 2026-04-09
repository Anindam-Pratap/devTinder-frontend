import React from 'react'


const UserCard = ({user}) => {

  const {firstName,lastName,about,photoUrl,gender,age} = user
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
      <div className="badge badge-outline bg-red-500">Ignore</div>
      <div className="badge badge-outline bg-green-600">Interested</div>
    </div>
  </div>
</div>
    </div>
  )
}


export default UserCard