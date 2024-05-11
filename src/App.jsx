import { Route, Routes } from "react-router-dom"
import {Login, PublicLayout, Register} from './pages/public'
import {path} from './ultils/paths'

function App() {

  return (
    <>
      <Routes>
        <Route path={path.PUBLIC} element={<PublicLayout/>}>
            <Route path={path.LOGIN} element={<Login/>}/>
            <Route path={path.REGISTER} element={<Register/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
