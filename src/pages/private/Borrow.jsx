import React, { Fragment, useEffect, useState } from 'react'
import { Button } from '../../components/public'
import { icons } from '../../ultils/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, destroyBorrowBook } from '../../redux/appSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getAllUser, getOneUser } from '../../apis/User'
import { BorrowModal } from '../../components/private'
import { createBorrow } from '../../apis/Borrow'
const Borrow = () => {
    const { CiCirclePlus } = icons
    const borrow = useSelector(state => state.app?.borrow)
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState('')
    const [showBorrow, setShowBorrow] = React.useState(false)
    const [email, setEmail] = useState('')
    // const [lending_date, setLending_date] = useState('')
    // const [return_date, setReturn_date] = useState('')
    const navigate = useNavigate()
    let quantity = borrow.reduce((total, item) => total + +item.quantity, 0)
    const dispatch = useDispatch()
    const handleDelete = (book_id) => {
        dispatch(deleteBook(book_id))
        toast.success('Xóa sách khỏi phiếu mượn thành công!')
    }
    useEffect(() => {
        const getAll = async () => {
            const response = await getAllUser()
            setUsers(response.data)
        }
        getAll()
    }, [])
    useEffect(()=>{
        if(userId){
            const getOneUserEmail = async()=>{
                const response = await getOneUser(userId)
                console.log(response.data.email)
                setEmail(response.data.email)
            }
            getOneUserEmail()
        }  
    },[userId])
    const handleAddBorrow = async () => {
        const data = {
            user_id: userId,
            book_ids: borrow.map(item => +item.book_id),
            quantities: borrow.map(item => +item.quantity)
        }
        await createBorrow(data)
        dispatch(destroyBorrowBook())
        toast.success('Mượn sách thành công!')
    }
    return (
        <>
            {showBorrow && <BorrowModal setShowBorrow={setShowBorrow} />}
            <div className='flex min-h-[650px]'>
                <div className='flex flex-col gap-12 w-1/2 p-6'>
                    <div className='flex gap-4'>
                        <span className='text-[20px] font-semibold'>Số lượng sách</span>
                        <input type="text" value={quantity} disabled className='pl-6' />
                    </div>
                    {/* <div className='flex gap-8'>
                        <span className='text-[20px] font-semibold'>Ngày mượn</span>
                        <input type="date" value={lending_date} onChange={(e)=>setLending_date(e.target.value)} className='w-[180px] pl-6' />
                    </div> */}
                    {/* <div className='flex gap-16'>
                        <span className='text-[20px] font-semibold'>Ngày trả</span>
                        <input type="date" value={return_date} onChange={(e)=>setReturn_date(e.target.value)} className='w-[180px] pl-6' />
                    </div > */}
                    <div className='flex gap-7 items-center'>
                        <span className='text-[20px] font-semibold'>Người mượn</span>
                        <select className='px-4 py-2' name="" id="" onChange={(e) => setUserId(e.target.value)}>
                            <option value="">Chọn người mượn</option>
                            {users.length > 0 && users.map((item) => {
                                return (
                                    <Fragment key={item.user_id}>
                                        <option value={item.user_id}>{item.user_name}</option>
                                    </Fragment>
                                )
                            })}
                        </select>
                    </div>
                    <div className='flex gap-16'>
                        <span className='text-[20px] font-semibold'>Email</span>
                        <input type="text" value={email} className='pl-6' />
                    </div>
                </div>
                <div className='w-1/2 flex flex-col'>
                    <div className='flex flex-col gap-2 p-2 bg-white'>
                        <h1 className='font-semibold mt-4 text-[24px] border-b pb-4 w-full text-center  '>Danh sách sách mượn</h1>
                        <div className='flex flex-col gap-4'>
                            {borrow.length > 0 && borrow.map((item) => {
                                quantity += item.quantity
                                return (
                                    <div key={item.book_id} className='flex justify-around'>
                                        <img src={`http://localhost:5000/api/image/get?id=${item.book_id}`} alt={item.title} className='w-[80px] h-[120px]' />
                                        <div className='flex gap-4 flex-col'>
                                            <div>
                                                <span>Mã sách: </span>
                                                <span>{item.book_id}</span>
                                            </div>
                                            <div>
                                                <span>Số lượng: </span>
                                                <span>{item.quantity}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                name='Xóa'
                                                style='bg-red-500 w-[150px] hover:bg-gray-500 text-white p-2 rounded-md'
                                                onClick={() => handleDelete(item.book_id)}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div
                            className='flex gap-2 items-center my-4 '
                            onClick={() => setShowBorrow(true)}
                        >
                            <CiCirclePlus size={24} />
                            <span className='cursor-pointer hover:text-orange-400'>
                                Thêm sách mượn
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <Button
                            name='Hủy'
                        />
                        <Button
                            name='Mượn sách'
                            onClick={handleAddBorrow}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Borrow