import React from 'react'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    
    <>
    <header></header>
      <Outlet/>
      <footer></footer>
    </>
  )
}

export default PublicLayout
