import React, { useEffect } from 'react'
import { Button, InputField } from '../../components/public'
import { getAllParams, updateOneParams } from '../../apis/Params'
import { toast } from 'react-toastify'
const Params = () => {
  const [params, setParams] = React.useState({})
  const [maxAccountAge, setMaxAccountAge] = React.useState(0)
  const [maxAge, setMaxAge] = React.useState(0)
  const [minAge, setMinAge] = React.useState(0)
  const [maxLendingPeriod, setMaxLendingPeriod] = React.useState(0)
  const [maxLendingQuantity, setMaxLendingQuantity] = React.useState(0)
  const [maxPublicationYearGab, setMaxPublicationYearGab] = React.useState(0)
  const getParams = async () => {
    const response = await getAllParams()
    if (response.status === 200) {
      setParams(response.data)
      setMaxAccountAge(response.data.maximum_account_age)
      setMaxAge(response.data.maximum_age)
      setMinAge(response.data.minimum_age)
      setMaxLendingPeriod(response.data.maximum_lending_period)
      setMaxLendingQuantity(response.data.maximum_lending_quantity)
      setMaxPublicationYearGab(response.data.maximum_publication_year_gab)
    }
  }
  const updateParams = async({param_name,new_value})=>{
    const data = {
      param_name,
      new_value
    }
    const response = await updateOneParams(data)
    if(response.status === 200){
      getParams()
      toast.success('Cập nhật thành công')
    }
  }
  useEffect(() => {
    getParams()
  }, [])
  return (
    <>
      <div className='flex flex-col gap-3 mb-12'>
      <div className='bg-gray-300 flex flex-col gap-4 p-6 rounded-md'>
        <div className='flex justify-between'>
          <div className='flex gap-3 items-center'>
            <span className='font-semibold text-[18px]'>Hạn sử dụng thẻ độc giả: </span>
            <span className='flex items-center gap-2'> 
              <InputField
                type='number'
                data={maxAccountAge}
                setData={setMaxAccountAge}
                style={'w-20 px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'}
              />
               ngày </span>
          </div>
          <div>
            <Button
              name='Cập nhật'
              style='bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 font-semibold'
              onClick={()=>updateParams({param_name:'maximum_account_age',new_value:maxAccountAge})}
            />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-3 items-center'>
            <span className='font-semibold text-[18px]'>Tuổi tối đa của độc giả: </span>
            <span className='flex items-center gap-2'> 
              <InputField
                type='number'
                data={maxAge}
                setData={setMaxAge}
                style={'w-20 px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'}
              />
               tuổi </span>
          </div>
          <div>
            <Button
              name='Cập nhật'
              style='bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 font-semibold'
              onClick={()=>updateParams({param_name:'maximum_age',new_value:maxAge})}
            />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-3 items-center'>
            <span className='font-semibold text-[18px]'>Tuổi tối thiểu của độc giả: </span>
            <span className='flex items-center gap-2'> 
              <InputField
                type='number'
                data={minAge}
                setData={setMinAge}
                style={'w-20 px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'}
              />
               tuổi </span>
          </div>
          <div>
            <Button
              name='Cập nhật'
              style='bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 font-semibold'
              onClick={()=>updateParams({param_name:'minimum_age',new_value:minAge})}
            />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-3 items-center'>
            <span className='font-semibold text-[18px]' >Thời hạn mượn tối đa</span>
            <span className='flex items-center gap-2'> 
              <InputField
                type='number'
                data={maxLendingPeriod}
                setData={setMaxLendingPeriod}
                style={'w-20 px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'}
              />
               ngày </span>
          </div>
          <div>
            <Button
              name='Cập nhật'
              style='bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 font-semibold'
              onClick={()=>updateParams({param_name:'maximum_lending_period',new_value:maxLendingPeriod})}
            />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-3 items-center'>
            <span className='font-semibold text-[18px]'>Số lượng sách mượn tối đa: </span>
            <span className='flex items-center gap-2'> 
              <InputField
                type='number'
                data={maxLendingQuantity}
                setData={setMaxLendingQuantity}
                style={'w-20 px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'}
              />
               sách </span>
          </div>
          <div>
            <Button
              name='Cập nhật'
              style='bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 font-semibold'
              onClick={()=>updateParams({param_name:'maximum_lending_quantity',new_value:maxLendingQuantity})}
            />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-3 items-center'>
            <span className='font-semibold text-[18px]'>Khoảng cách năm xuất bản: </span>
            <span className='flex items-center gap-2'> 
              <InputField
                type='number'
                data={maxPublicationYearGab}
                setData={setMaxPublicationYearGab}
                style={'w-20 px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'}
              />
               ngày </span>
          </div>
          <div>
            <Button
              name='Cập nhật'
              style='bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 font-semibold'
              onClick={()=>updateParams({param_name:'maximum_publication_year_gab',new_value:maxPublicationYearGab})}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Params