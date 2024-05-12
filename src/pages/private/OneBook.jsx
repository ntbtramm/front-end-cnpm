import React from 'react'
import { useParams } from 'react-router-dom'

const OneBook = () => {
    const {book_id} = useParams()
  return (
    <div>{book_id}</div>
  )
}

export default OneBook