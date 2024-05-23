import React from 'react'
import { useDispatch } from 'react-redux'
import { borrowBook } from '../../redux/appSlice'
import { toast } from 'react-toastify'
import { oneBook } from '../../apis/Books'
const BorrowModal = (props) => {
    const { setShowBorrow } = props
    const [bookId, setBookId] = React.useState('')
    const [quantity, setQuantity] = React.useState('')
    const [book, setBook] = React.useState({})
    const dispatch = useDispatch()
    const handleAddBookToBorrow = () => {

        return oneBook(bookId).then((response) => {
            setBook(response.data)
            return response.data
        }).then((item) => {
            console.log(item)

            if (item.available >= quantity) {
                setShowBorrow(false)


                dispatch(borrowBook({
                    book_id: bookId,
                    quantity: quantity
                }))

                toast.success('Thêm sách vào phiếu mượn thành công!')
            }
            else {
                toast.error('Số lượng sách không đủ!')
            }
        })
    }
    return (
        <div>
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-12'>
                <h1 className='font-semibold text-[30px]'>Thêm sách mượn</h1>
                <div className='w-[300px]'>
                    <label className='font-semibold'>Mã sách cần mượn</label>
                    <input
                        min={1}
                        type="number"
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                    />
                    <label className='font-semibold'>Số lượng muốn mượn</label>
                    <input
                        min={1}
                        type="number"
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className='flex justify-end gap-4 mt-6'>
                    <button className='p-4 bg-blue-500 text-white rounded-md' onClick={() => handleAddBookToBorrow()}>Thêm</button>
                    <button className='p-4 bg-red-500 text-white rounded-md' onClick={() => setShowBorrow(false)}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default BorrowModal