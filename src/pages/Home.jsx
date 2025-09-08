/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { GrCircleInformation } from "react-icons/gr";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getAllBooks } from "../api/bookApi";
import { useQuery } from "@tanstack/react-query";

const fetchBooks = async () => {
  const response = await getAllBooks();
  return response.data.data;
};

const Home = () => {
  const {
    data: books,
    isLoading: loading,
    isError: error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Books List</h1>
        <Link
          to="/createbook"
          className="bg-green-600 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
        >
          <BiAddToQueue className="text-xl" />
          Add Book
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          {books.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 text-lg">No books found.</p>
              <Link
                to="/createbook"
                className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
              >
                Add your first book
              </Link>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left font-medium">No.</th>
                  <th className="p-3 text-left font-medium">Book Title</th>
                  <th className="p-3 text-left font-medium max-md:hidden">
                    Author
                  </th>
                  <th className="p-3 text-left font-medium max-md:hidden">
                    Publish Year
                  </th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books &&
                  books.map((book, index) => (
                    <tr
                      key={book._id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3 font-medium">{book.title}</td>
                      <td className="p-3 max-md:hidden">{book.author}</td>
                      <td className="p-3 max-md:hidden">{book.publishyear}</td>
                      <td className="p-3">
                        <div className="flex gap-3">
                          <Link
                            to={`/showbook/${book._id}`}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="View Details"
                          >
                            <GrCircleInformation className="text-xl" />
                          </Link>
                          <Link
                            to={`/editbook/${book._id}`}
                            className="text-yellow-600 hover:text-yellow-800 transition-colors"
                            title="Edit"
                          >
                            <AiFillEdit className="text-xl" />
                          </Link>
                          <Link
                            to={`/deletebook/${book._id}`}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
                            <AiFillDelete className="text-xl" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
