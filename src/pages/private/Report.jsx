import React, { useEffect } from 'react'
import { getGenreReport, getOverdueReport } from '../../apis/Report'
import {formatTime} from '../../ultils/helpers'
const days = Array.from({length: 31}, (_, i) => i + 1);
const months = Array.from({length: 12}, (_, i) => i + 1);

const Report = () => {
  const [reportType, setReportType] = React.useState(0)
  const [report,setReport] = React.useState([])
  const [day, setDay] = React.useState(new Date().getDay())
  const [month, setMonth] = React.useState(new Date().getMonth()+1)
  const [year, setYear] = React.useState(new Date().getFullYear())
  const getAllGenreReport =async() =>{
    const data = {
      month: month,
      year: +year
    }
    const response =  await getGenreReport(data)
    setReport(response.data)
  }
  const getAllOverdueReport =async() =>{
    const data = {
      day: day,
      month: month,
      year: +year
    }
    const response = await getOverdueReport(data)
    setReport(response.data)
  }
  useEffect(()=>{
    if(reportType === 0){
      getAllGenreReport()
    }
    else if(reportType === 1){
      getAllOverdueReport()
    }
  },[reportType])
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-center gap-4'>
            <span 
              className={`bg-gray-100 p-2 rounded-md cursor-pointer text-[17px] ${reportType===0? 'text-orange-500':''}`}
              onClick={() => setReportType(0)}
            >
              Thống kê loại sách mượn
            </span>
            <span 
              className={`bg-gray-100 p-2 rounded-md cursor-pointer text-[17px] ${reportType===1? 'text-orange-500':''}`}
              onClick={() => setReportType(1)}  
            >
              Thống kê sách trả trễ
            </span>
        </div>
        <div>
          {reportType ===0  && (
            <div>
              
              <div className='flex gap-2 mb-4'>
                <select name="" id="" className='w-[80px] p-2 rounded-md' onChange={(e)=>setDay(e.target.value)}>
                  {
                    days.map((day)=>{
                      return <option value={day}>{day}</option>
                    })
                  }
                </select>
                <select name="" id="" className='w-[80px] p-2 rounded-md' onChange={(e)=>setMonth(e.target.value)}>
                  {
                    months.map((month)=>{
                      return <option value={month}>{month}</option>
                    })
                  }
                </select>
                <select name="" id="" className='w-[80px] p-2 rounded-md' onChange={(e)=>setYear(e.target.value)}>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='border p-2'>STT</th>
                    <th className='border p-2'>Tên thể loại</th>
                    <th className='border p-2'>Sách mượn</th>
                    <th className='border p-2'>Tỉ lệ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border p-2'>1</td>
                    <td className='border p-2'>Thể loại A</td>
                    <td className='border p-2'>10</td>
                    <td className='border p-2'>50%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )} 
          {reportType ===1  && (
            <div>
              <div className='flex gap-2 mb-4'>
                <select name="" id="" className='w-[80px] p-2 rounded-md' onChange={(e)=>setDay(e.target.value)}>
                  {
                    days.map((day)=>{
                      return <option value={day}>{day}</option>
                    })
                  }
                </select>
                <select name="" id="" className='w-[80px] p-2 rounded-md' onChange={(e)=>setMonth(e.target.value)}>
                  {
                    months.map((month)=>{
                      return <option value={month}>{month}</option>
                    })
                  }
                </select>
                <select name="" id="" className='w-[80px] p-2 rounded-md' onChange={(e)=>setYear(e.target.value)}>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='border p-2'>STT</th>
                    <th className='border p-2'>Tên sách</th>
                    <th className='border p-2'>Ngày mượn</th>
                    <th className='border p-2'>Ngày trả trễ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=''>
                    <td className='border p-2'>1</td>
                    <td className='border p-2'>Sách A</td>
                    <td className='border p-2'>20/10/2021</td>
                    <td className='border p-2'>25/10/2021</td>
                  </tr>
                </tbody>
              </table>
            </div>
          
          )}
        </div>
      </div>
    </>
  )
}

export default Report