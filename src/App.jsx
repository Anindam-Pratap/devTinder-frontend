import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "../utils/appStore"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import EditProfile from "./components/EditProfile"
import PublicRoute from "./components/PublicRoute"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import Signup from "./components/Signup"



function App() {

  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/error" element={<Error />} />
              <Route path="/update" element={<EditProfile />} />
              <Route path="/connections" element={<Connections />} />
              
              <Route path="/requests" element={<Requests />} />
              <Route path="/signup" element={<PublicRoute>
                  <Signup />
                </PublicRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}



export default App
