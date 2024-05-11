import React from 'react'

const Button = (props) => {
    const {onClick,style,name}= props
  return (
    <button
        onClick={onClick}
        className={style? style : 'bg-black w-[300px] text-white p-2 rounded-2xl w-full mt-2 hover:text-gray-300' }
    >
        {name}
    </button>
  )
}

export default Button