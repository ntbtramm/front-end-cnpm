import React, { useEffect, useState } from 'react';
import { Button } from '../../components/public';
import { getAllAuthors, change_name, delete_name } from '../../apis/Author';
import AuthorModal from '../../components/private/AuthorModal';

const Author = () => {
    const [authors, setAuthors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingAuthorId, setEditingAuthorId] = useState(null);
    const [authorName, setAuthorName] = useState('');

    const getAuthor = async () => {
        const response = await getAllAuthors();
        setAuthors(response.data);
    };

    useEffect(() => {
        getAuthor();
    }, [showModal]);


    const handleDeleteClick = async(author) => {
        await delete_name(author.author_id, null);
        getAuthor();
    };

    const handleEditClick = (author) => {
        setEditingAuthorId(author.author_id);
        setAuthorName(author.author_name);
    };

    const handleSave = async (authorId) => {
        try {
            await change_name(authorId, authorName);
            console.log('Author name updated');
            setEditingAuthorId(null);
            getAuthor(); // Refresh the authors list after updating
        } catch (error) {
            console.error('Failed to update author name', error);
        }
    };

    const handleCancel = () => {
        setEditingAuthorId(null);
    };

    return (
        <div>
            {showModal && (
                <AuthorModal
                    setShowModal={setShowModal}
                />
            )}
            <div className="w-[180px]">
                <Button
                    name="Thêm tác giả"
                    onClick={() => {
                        setShowModal(true);
                    }}
                />
            </div>
            <table className="m-auto mt-6 w-full border-collapse shadow-lg">
                <thead className="bg-gray-100 border-gray-300">
                    <tr>
                        <th className="px-6 py-4 text-[16px] font-medium">
                            Mã tác giả
                        </th>
                        <th className="px-6 py-4 text-[16px] font-medium">
                            Tên tác giả
                        </th>
                        <th className="px-6 py-4 text-[16px] font-medium">
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((item) => (
                        <React.Fragment key={item.author_id}>
                            <tr>
                                <td className="px-6 py-4 text-center border-b">
                                    {item.author_id}
                                </td>
                                <td className="px-6 py-4 text-center border-b">
                                    {item.author_name}
                                </td>
                                <td className="px-6 py-4 text-center border-b">
                                    <button
                                        className="mr-2 w-[80px] p-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                                        onClick={() => handleEditClick(item)}
                                    >
                                        Sửa
                                    </button>
                                    <button className="p-1 w-[80px] bg-red-500 text-white rounded-md hover:bg-red-700"
                                        onClick={() => handleDeleteClick(item)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                            {editingAuthorId === item.author_id && (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center border-b">
                                        <div className="flex flex-col items-center">
                                            <label className="mb-2 text-[16px] font-medium">Tên tác giả</label>
                                            <input
                                                type="text"
                                                value={authorName}
                                                onChange={(e) => setAuthorName(e.target.value)}
                                                className="mb-2 p-2 border rounded"
                                            />
                                            <div>
                                                <button
                                                    className="mr-2 w-[80px] p-1 bg-green-500 text-white rounded-md hover:bg-green-700"
                                                    onClick={() => handleSave(item.author_id)}
                                                >
                                                    Lưu
                                                </button>
                                                <button
                                                    className="w-[80px] p-1 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                                                    onClick={handleCancel}
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Author;
