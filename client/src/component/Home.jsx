
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import bookBaseUrl from '../axiosInstance';
import { MdDelete } from 'react-icons/md';
import { FaPen } from 'react-icons/fa';

const EMPTY_FORM = {
  BookName: '',
  BookTitle: '',
  Author: '',
  SellingPrice: '',
  PublishDate: '',
  Id: '',
};

export default function Home() {
  const [bookForm, setBookForm] = useState(EMPTY_FORM);
  const [bookList, setBookList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const getAllBooks = async () => {
    setIsLoading(true);
    try {
      // GET http://localhost:8000/book/booklists
      const { data } = await bookBaseUrl.get('/book/booklists');
      setBookList(data.BookList || []);
    } catch (err) {
      toast.error(err.response?.data?.Message || 'Failed to fetch books');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const handleFormChange = e => {
    const { name, value } = e.target;
    setBookForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { BookName, BookTitle, Author, SellingPrice } = bookForm;
    if (!BookName || !BookTitle || !Author || !SellingPrice) {
      return toast.error('All fields are required');
    }
    setIsLoading(true);
    const endpoint = isUpdating ? '/book/updatebook' : '/book/addbook';
    try {
      const { data } = isUpdating
        ? await bookBaseUrl.put(endpoint, bookForm)
        : await bookBaseUrl.post(endpoint, bookForm);

      if (data.Success) {
        toast.success(data.Message);
        setBookForm(EMPTY_FORM);
        setIsUpdating(false);
        getAllBooks();
      } else {
        toast.error(data.Message || 'Operation failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.Message || 'Request failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this book?')) return;
    setIsLoading(true);
    try {
      // POST http://localhost:8000/book/deletebook
      const { data } = await bookBaseUrl.post('/book/deletebook', { Id: id });
      if (data.Success) {
        toast.info(data.Message);
        getAllBooks();
      } else {
        toast.error(data.Message || 'Delete failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.Message || 'Delete failed');
    } finally {
      setIsLoading(false);
    }
  };


  const handleUpdate = book => {
    setBookForm({
      BookName: book.BookName,
      BookTitle: book.BookTitle,
      Author: book.Author,
      SellingPrice: book.SellingPrice,
      PublishDate: book.PublishDate?.slice(0, 10) || '',
      Id: book._id,
    });
    setIsUpdating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-600 p-6">

      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-Black mb-4">
          {isUpdating ? 'Update Book' : 'Add New Book'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['BookName', 'BookTitle', 'Author', 'SellingPrice', 'PublishDate'].map(f => (
            <div key={f} className="flex flex-col">
              <label className="mb-1 text-black">
                {f === 'PublishDate' ? 'Publish Date' : f.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={f === 'PublishDate' ? 'date' : f === 'SellingPrice' ? 'number' : 'text'}
                name={f}
                value={bookForm[f]}
                onChange={handleFormChange}
                placeholder={f.replace(/([A-Z])/g, ' $1')}
                className="border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {isLoading ? (isUpdating ? 'Updating...' : 'Saving...') : isUpdating ? 'Update' : 'Submit'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              {['Name', 'Title', 'Author', 'Price', 'Published', 'Actions'].map(h => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-sm font-medium text-white uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookList.length > 0 ? (
              bookList.map(b => (
                <tr key={b._id} className="even:bg-gray-700 hover:bg-gray-600 transition">
                  <td className="px-4 py-3 text-white">{b.BookName}</td>
                  <td className="px-4 py-3 text-white">{b.BookTitle}</td>
                  <td className="px-4 py-3 text-white">{b.Author}</td>
                  <td className="px-4 py-3 text-white">{b.SellingPrice}</td>
                  <td className="px-4 py-3 text-white">
                    {b.PublishDate ? new Date(b.PublishDate).toLocaleDateString() : '--'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-3">
                      <button onClick={() => handleUpdate(b)} className="text-green-400 hover:text-green-200">
                        <FaPen size={18} />
                      </button>
                      <button onClick={() => handleDelete(b._id)} className="text-red-400 hover:text-red-200">
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-300">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
