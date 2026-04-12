import axios from "axios"
import { useDispatch,useSelector} from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../../utils/constants"
import { removeUser } from "../../utils/userSlice"


const NavBar = () => {
    const user = useSelector((store)=>store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async() =>{
try{await axios.post(
  
  BASE_URL+"logout",
  {},
  {withCredentials:true}
)
dispatch(removeUser())
navigate("/login")
}catch(err){
navigate("/error")
}
    }
    return (
<div className="navbar  shadow-sm bg-neutral">
  <div className="flex-1">
    <Link className="btn btn-ghost text-xl" to="/">DEV-TINDER</Link>
  </div>
  {user &&(<div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {user ? (
  <>
    <li>
      <Link className="justify-between" to="/update">
        Profile
        <span className="badge">New</span>
      </Link>
    </li>
    <li><Link to="/connections">Connections</Link></li>
    <li><Link to="/requests">Requests</Link></li>
    <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
  </>
) : (
  <>
    <li><Link to="/signup">Sign Up</Link></li>
    <li><Link to="/login">Login</Link></li>
  </>
)}
      </ul>
    </div>
  </div>)}
</div>
    )
}

export default NavBar