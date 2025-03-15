/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { GrCircleInformation } from "react-icons/gr";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import axios from "axios";
import { Link } from "react-router-dom";


const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(""); // Reset error on new request

    axios
      .get(`https://backend-crud-mern.onrender.com/book`)
      .then((response) => {
        const fetchedBooks = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setBooks(fetchedBooks);
      })
      .catch((error) => {
        setError("Failed to fetch books. Please try again.");
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/createbook">
          <BiAddToQueue className="text-green-600 text-4xl cursor-pointer" />
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <table className="w-full border border-gray-800">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-800 p-2">No.</th>
              <th className="border border-gray-800 p-2">Book Title</th>
              <th className="border border-gray-800 p-2 max-md:hidden">
                Author
              </th>
              <th className="border border-gray-800 p-2 max-md:hidden">
                Publish Year
              </th>
              <th className="border border-gray-800 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="text-center hover:bg-gray-50">
                <td className="border border-gray-800 p-2">{index + 1}</td>
                <td className="border border-gray-800 p-2">{book.title}</td>
                <td className="border border-gray-800 p-2 max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-gray-800 p-2 max-md:hidden">
                  {book.publishyear}
                </td>
                <td className="border border-gray-800 p-2">
                  <div className="flex justify-center gap-x-3">
                    <Link to={`/showbook/${book._id}`} title="View Details">
                      <GrCircleInformation className="text-blue-600 text-lg cursor-pointer" />
                    </Link>
                    <Link to={`/editbook/${book._id}`} title="Edit">
                      <AiFillEdit className="text-yellow-600 text-lg cursor-pointer" />
                    </Link>
                    <Link to={`/deletebook/${book._id}`} title="Delete">
                      <AiFillDelete className="text-red-600 text-lg cursor-pointer" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
