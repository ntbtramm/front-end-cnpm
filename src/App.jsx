import { Route, Routes } from "react-router-dom"
import {Login, PublicLayout} from './pages/public'
import path from './ultils/paths'

function App() {

  return (
    <>
      <Routes>
        <Route path={path.PUBLIC} element={<PublicLayout/>}>
            <Route path={path.LOGIN} element={<Login/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
