import React, { useEffect, useState } from 'react'
import { getGenreReport, getOverdueReport } from '../../apis/Report'
import { formatTime } from '../../ultils/helpers'
const months = Array.from({ length: 12 }, (_, i) => i + 1);

const Report = () => {
  const [reportType, setReportType] = React.useState(0)
  const [report, setReport] = React.useState([])
  const [day, setDay] = React.useState(new Date().getDay())
  const [month, setMonth] = React.useState(new Date().getMonth() + 1)
  const [year, setYear] = React.useState(new Date().getFullYear())
  const [days, setDays] = useState([]);
  const getAllGenreReport = async () => {
    const data = {
      month: month,
      year: +year
    }
    const response = await getGenreReport(data)
    setReport(response.data)
  }
  const getAllOverdueReport = async () => {
    const data = {
      day: day,
      month: month,
      year: +year
    }
    const response = await getOverdueReport(data)
    setReport(response.data)
  }
  const updateDaysInMonth = (month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const newDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(newDays);
  };
  useEffect(() => {
    updateDaysInMonth(month, year);
  }, [month, year]);
  useEffect(() => {
    if (reportType === 0) {
      getAllGenreReport()
    }
    else if (reportType === 1) {
      getAllOverdueReport()
    }
  }, [reportType, day, month, year])
  console.log(report)
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-center gap-4'>
          <span
            className={`bg-gray-100 p-2 rounded-md cursor-pointer text-[17px] ${reportType === 0 ? 'text-orange-500' : ''}`}
            onClick={() => setReportType(0)}
          >
            Thống kê loại sách mượn
          </span>
          <span
            className={`bg-gray-100 p-2 rounded-md cursor-pointer text-[17px] ${reportType === 1 ? 'text-orange-500' : ''}`}
            onClick={() => setReportType(1)}
          >
            Thống kê sách trả trễ
          </span>
        </div>
        <div>
          {reportType === 0 && (
            <div>

              <div className='flex gap-2 mb-4'>
                <select
                  className='w-[80px] p-2 rounded-md'
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  {
                    days.map((day) => {
                      return <option value={day}>{day}</option>
                    })
                  }
                </select>
                <select
                  className='w-[80px] p-2 rounded-md'
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                >
                  {
                    months.map((month) => {
                      return <option value={month}>{month}</option>
                    })
                  }
                </select>
                <select
                  className='w-[80px] p-2 rounded-md'
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                >
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
                    <th className='border p-2'>Tổng số lượt mượn</th>
                    <th className='border p-2'>Tỉ lệ</th>
                  </tr>
                </thead>
                <tbody>
                  {report.length > 0 && report.map((item) => {
                    return (
                      <tr>
                        <td className='border p-2 text-center'>{item.genre_id}</td>
                        <td className='border p-2 text-center'>{item.genre_name}</td>
                        <td className='border p-2 text-center'>{item.total_lending}</td>
                        <td className='border p-2 text-center'>{item.ratio}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
          {reportType === 1 && (
            <div>
              <div className='flex gap-2 mb-4'>
                <select
                  className='w-[80px] p-2 rounded-md'
                  onChange={(e) => setDay(e.target.value)}
                  value={day}
                >
                  {
                    days.map((day) => {
                      return <option value={day}>{day}</option>
                    })
                  }
                </select>
                <select
                  className='w-[80px] p-2 rounded-md'
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                >
                  {
                    months.map((month) => {
                      return <option value={month}>{month}</option>
                    })
                  }
                </select>
                <select
                  className='w-[80px] p-2 rounded-md'
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                >
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              {report.length > 0 ? (
                <table className='w-full'>
                  <thead>
                    <tr>
                      <th className='border p-2'>Mã phiếu mượn</th>
                      <th className='border p-2'>Tên sách</th>
                      <th className='border p-2'>Ngày mượn</th>
                      <th className='border p-2'>Ngày trả trễ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.length > 0 && report.map((item) => {
                      return (
                        <tr>
                          <td className='border p-2 text-center'>{item.lending_id}</td>
                          <td className='border p-2 text-center'>{item.book_name}</td>
                          <td className='border p-2 text-center'>{item.lending_date}</td>
                          <td className='border p-2 text-center'>{item.num_day_late}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <div className='text-center font-semibold text-[20px]'>
                  Chưa có báo cáo nào
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Report