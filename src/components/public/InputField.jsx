import React from 'react'

const InputField = (props) => {
    const { type, placeholder, data, setData,style}= props
  return (
    <input 
        className={style? style : 'border border-gray-300 p-3 rounded-2xl w-full mt-2' }
        type={type? type : 'text'}
        placeholder={placeholder}
        value={data}
        onChange={(e) => setData(e.target.value)}
    />
  )
}

export default InputField