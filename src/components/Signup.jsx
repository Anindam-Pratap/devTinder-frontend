import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [gender, setGender] = useState()
    const [age, setAge] = useState()
    const [emailId, setEmailId] = useState()
    const [password, setPassword] = useState()
    const [profileCreatedAlert, setProfileCreatedAlert] = useState(false)

    const navigate = useNavigate()

    const signUpUser = async () => {
          if (!firstName || !lastName || !emailId || !password) {
    alert("Please fill all required fields")
    return
  }
        try {
            await axios.post(
                BASE_URL + "signup",
                { firstName, lastName, gender, age, emailId, password },
                { withCredentials: true }
            )
            setProfileCreatedAlert(true)
            setTimeout(() => {
                navigate("/login")
            }, 1500)

        } catch (err) {
            console.log(err)
        }


    }
    return (
        <div>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Sign Up</legend>



                <label className="label">First Name</label>
                <input type="text" className="input" placeholder="Fist Name" onChange={(e) => (setFirstName(e.target.value))} value={firstName} />
                <label className="label">Last Name</label>
                <input type="text" className="input" placeholder="Last Name" onChange={(e) => (setLastName(e.target.value))} value={lastName} />


                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" onChange={(e) => (setEmailId(e.target.value))} value={emailId} />
                <label className="label">Password</label>
                <input type="passowrd" className="input" placeholder="Password" onChange={(e) => (setPassword(e.target.value))} value={password} />

                <label className="label">age</label>
                <input type="number" className="input" placeholder="You must be 18+" onChange={(e) => (setAge(e.target.value))} value={age} />

                <label className="label">Gender</label>



                <button className="btn" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}>
                    {gender || "Gender"}
                </button>

                <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                    popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */}>
                    <li><a onClick={() => (setGender("male"))}>male</a></li>
                    <li><a onClick={() => (setGender("female"))}>female</a></li>
                    <li><a onClick={() => (setGender("others"))}>others</a></li>
                </ul>

                <button className="btn btn-neutral mt-4" onClick={() => signUpUser()}>Sign Up</button>
            </fieldset>
            {profileCreatedAlert && (
                <div className="toast toast-top toast-center">

                    <div className="alert alert-success">
                        <span>Sign Up Successfully</span>
                    </div>


                </div>
            )}
        </div>
    )
}

export default Signup