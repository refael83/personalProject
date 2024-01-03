import Home from './page/Home';
import Airports from './page/Airports';
import Users from './page/Users'
import { Routes, BrowserRouter, Route } from "react-router-dom";


export default function App() {
  
  return(
   <div>
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/airports' element={<Airports/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
      </Routes>
    </BrowserRouter>
  </div>
  )
}
