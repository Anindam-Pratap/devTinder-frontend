import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Shimmer from './Shimmer'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import { addUser } from '../../utils/userSlice'

const EditProfile = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [about, setAbout] = useState(user?.about)
  const [gender, setGender] = useState(user?.gender)
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl)
  const [age, setAge] = useState(user?.age)
  const [profileUpdatedAlert, setProfileUpdatedAlert] = useState(false)
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "")
      setLastName(user.lastName || "")
      setAbout(user.about || "")
      setGender(user.gender || "")
      setPhotoUrl(user.photoUrl || "")
      setAge(user.age || "")
    }
  }, [user])
  const updateProfile = async () => {
    try {
      const res = await axios.put(
        BASE_URL + "profile/update",
        { firstName, lastName, about, gender, photoUrl, age },
        { withCredentials: true }
      )

      dispatch(addUser(res?.data?.data))
      setProfileUpdatedAlert(true)
      setTimeout(()=>{
        setProfileUpdatedAlert(false)
      },5000)
    } catch (err) {
      return err
    }
  }
 
  return (
    (!user) ? <Shimmer /> :
      <div className='flex justify-center'>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Edit Your Profile</legend>

          <label className="label">First Name</label>
          <input type="text" className="input" onChange={(e) => (setFirstName(e.target.value))} value={firstName || ""}/>

          <label className="label">Last Name</label>
          <input type="text" className="input" onChange={(e) => (setLastName(e.target.value))} value={lastName || ""}  />

          <label className="label">About</label>
          <input type="text" className="input" onChange={(e) => (setAbout(e.target.value))} value={about || ""}  />
          
          <label className="label">Photo URL</label>
          <input type="text" className="input" onChange={(e) => (setPhotoUrl(e.target.value))} value={photoUrl || ""}  />

          <label className="label">Age</label>
          <input type="text" className="input" onChange={(e) => (setAge(e.target.value))} value={age || ""} />
             <label className="label">Gender</label>
            <div className="dropdown">
  <div tabIndex={0} role="button" className="btn m-1">{gender || "Gender"}</div>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a onClick={()=>(setGender("male"))}>male</a></li>
    <li><a onClick={()=>(setGender("female"))}>female</a></li>
    <li><a onClick={()=>(setGender("others"))}>others</a></li>
  </ul>
</div>
          <button className="btn" onClick={updateProfile}>Update Profile</button>
       
        </fieldset>
        <div>
          <div className='mx-5'>This is how your profile will look</div>
          <div className='my-2 mx-5'><UserCard user={{ firstName, lastName, about, gender, age, photoUrl }} firstButton="Ignore" secondButton="Interested" /></div>
        </div>
        {profileUpdatedAlert &&(
        <div className="toast toast-top toast-center">

          <div className="alert alert-success">
            <span>Profile Updated Successfully</span>
          </div>

          
        </div>
        )}
      
      </div>
  )
}

export default EditProfile