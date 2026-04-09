import { useState } from 'react'
import { useSelector } from 'react-redux'
import Shimmer from './Shimmer'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'

const EditProfile = () => {
    const user = useSelector((store)=>store.user)
    const [firstName,setFirstName] = useState(user?.firstName)
    const [lastName,setLastName] = useState(user?.lastName)
    const [about,setAbout] = useState(user?.about)
    const [gender,setGender] = useState(user?.gender)
    const [photoUrl,setPhotoUrl] = useState(user?.photoUrl)
    const [age,setAge] = useState(user?.age)
    const updateProfile = async() => {
try{await axios.patch(
  BASE_URL+"profile/update",
  {firstName,lastName,about,gender,photoUrl,age},
  {withCredentials:true}
)

}catch(err){
return err
}
    }
  return (
    (!user)?<Shimmer />:
    <div className='flex justify-center'>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Edit Your Profile</legend>

  <label className="label">First Name</label>
  <input type="text" className="input" onChange={(e)=>(setFirstName(e.target.value))} placeholder={firstName} />

  <label className="label">Last Name</label>
  <input type="text" className="input" onChange={(e)=>(setLastName(e.target.value))} placeholder={lastName} />

  <label className="label">About</label>
  <input type="text" className="input" onChange={(e)=>(setAbout(e.target.value))} placeholder={about} />
  <label className="label">Gender</label>
  <input type="text" className="input" onChange={(e)=>(setGender(e.target.value))} placeholder={gender} />
  <label className="label">Photo URL</label>
  <input type="text" className="input" onChange={(e)=>(setPhotoUrl(e.target.value))} placeholder={photoUrl} />

  <label className="label">Age</label>
  <input type="text" className="input" onChange={(e)=>(setAge(e.target.value))} placeholder={age} />
  <button className="btn" onClick={updateProfile}>Update Profile</button>
</fieldset>
<div>
<div className='mx-5'>This is how your profile will look</div>
<div className='my-2 mx-5'><UserCard user={{firstName,lastName,about,gender,age,photoUrl}}/></div>
</div>
    </div>
  )
}

export default EditProfile