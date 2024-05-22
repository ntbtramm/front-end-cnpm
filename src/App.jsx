import { Route, Routes } from "react-router-dom"
import { Login, PublicLayout, Register } from './pages/public'
import { path } from './ultils/paths'
import { Author, Books, Borrow, BorrowCard, BorrowDetail, Genre, Home, OneBook, Params, PrivateLayout, Reader, Report } from "./pages/private"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
      <Routes>
        <Route path={path.PUBLIC} element={<PublicLayout />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.ALL} element={<Login />} />
          <Route path="/" element={<Login />} />
        </Route>
        <Route path={path.PRIVATE} element={<PrivateLayout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BOOKS} element={<Books />} />
          <Route path={path.BORROW} element={<BorrowCard />} />
          <Route path={path.ONE_BOOK} element={<OneBook />} />
          <Route path={path.GENRE} element={<Genre />} />
          <Route path={path.AUTHOR} element={<Author />} />
          <Route path={path.READER} element={<Reader/>} />
          <Route path={path.ADD_BORROW} element={<Borrow />} />
          <Route path={path.DETAIL_BORROW} element={<BorrowDetail />} />
          <Route path={path.REPORT} element={<Report />} />
          <Route path={path.PARAMS} element={<Params />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
