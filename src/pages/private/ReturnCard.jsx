import React from 'react'
import { useParams } from 'react-router-dom'

const ReturnCard = () => {
    const { id } = useParams()
  return (
    <div>
        {id}
    </div>
  )
}

export default ReturnCard