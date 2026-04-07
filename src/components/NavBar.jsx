import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const NavBar = () => {
    const user = useSelector((store)=>store.user)
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
        <li>
          <Link className="justify-between" to="/profile">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link>Settings</Link></li>
        <li><Link>Logout</Link></li>
      </ul>
    </div>
  </div>)}
</div>
    )
}

export default NavBar