
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Profile = () => {
  const user= useSelector((store)=>store.user)
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm mx-auto my-10">
  <figure>
    <img
      src={user.photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {user.firstName + " "+ user.lastName + "," + user.age}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>{user.about}</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline"><Link to="/update">Edit Your Profile</Link></div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Profile