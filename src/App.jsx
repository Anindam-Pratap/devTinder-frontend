import { BrowserRouter ,Route, Routes} from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "../utils/appStore"
import Feed from "./components/Feed"



function App() {
  
  return (
    <div>
    <Provider store={appStore}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/login" element={<Login />} />
         <Route path="/" element={<Feed />} />
      </Route>
    </Routes>
</BrowserRouter>
</Provider>
  </div>
  )
}



export default App
