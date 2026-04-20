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
      setTimeout(() => setProfileUpdatedAlert(false), 3000)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    (!user) ? <Shimmer /> :
      <div className='flex flex-col lg:flex-row items-center justify-center gap-6 p-4'>

        {/* FORM */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-4">
          <legend className="fieldset-legend text-lg font-semibold">
            Edit Your Profile
          </legend>

          <label className="label">First Name</label>
          <input type="text" className="input w-full"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName || ""}
          />

          <label className="label">Last Name</label>
          <input type="text" className="input w-full"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName || ""}
          />

          <label className="label">About</label>
          <input type="text" className="input w-full"
            onChange={(e) => setAbout(e.target.value)}
            value={about || ""}
          />

          <label className="label">Photo URL</label>
          <input type="text" className="input w-full"
            onChange={(e) => setPhotoUrl(e.target.value)}
            value={photoUrl || ""}
          />

          <label className="label">Age</label>
          <input type="number" className="input w-full"
            onChange={(e) => setAge(e.target.value)}
            value={age || ""}
          />

          {/* Gender Dropdown */}
          <label className="label">Gender</label>
          <select
            className="select select-bordered w-full"
            value={gender || ""}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <button className="btn btn-primary mt-4 w-full"
            onClick={updateProfile}>
            Update Profile
          </button>
        </fieldset>

        {/* PREVIEW */}
        <div className='w-full max-w-md'>
          <div className='font-bold mb-2 text-center lg:text-left'>
            Preview
          </div>
          <UserCard
            user={{ firstName, lastName, about, gender, age, photoUrl }}
            firstButton="Ignore"
            secondButton="Interested"
          />
        </div>

        {/* TOAST */}
        {profileUpdatedAlert && (
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