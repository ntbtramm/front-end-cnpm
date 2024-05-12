import { Route, Routes } from "react-router-dom"
import {Login, PublicLayout, Register} from './pages/public'
import {path} from './ultils/paths'
import { Books, Borrow, Home, PrivateLayout } from "./pages/private"

function App() {

  return (
    <>
      <Routes>
        <Route path={path.PUBLIC} element={<PublicLayout/>}>
            <Route path={path.LOGIN} element={<Login/>}/>
            <Route path={path.REGISTER} element={<Register/>}/>
            <Route path={path.ALL} element={<Login/>}/>
            <Route path="/" element={<Login/>}/>
        </Route>
        <Route path={path.PRIVATE} element={<PrivateLayout/>}>
            <Route path={path.HOME} element={<Home/>}/>
            <Route path={path.BOOKS} element={<Books/>}/>
            <Route path={path.BORROW} element={<Borrow/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
