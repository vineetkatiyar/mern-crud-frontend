/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import Spiner from "../components/Spiner";

const API_URL = import.meta.env.BACKEND_API_URL;

const ShowBookPage = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://backend-crud-mern.onrender.com/book/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-3xl text-center">Book Details</h1>

      <div className="border-2 border-black rounded p-2 mb-4">
        <BackButton className="bg-black text-white p-2 rounded" />
      </div>

      {loading ? (
        <Spiner />
      ) : (
        <div className="border-2 text-center border-gray-700 w-1/3 p-6 bg-gray-100 rounded">
          <div>
            <span className="text-orange-500 font-bold mr-4">Id:</span>
            {book._id || "N/A"}
          </div>
          <div>
            <span className="text-orange-500 font-bold mr-4">Title:</span>
            {book.title || "N/A"}
          </div>
          <div>
            <span className="text-orange-500 font-bold mr-4">Author:</span>
            {book.author || "N/A"}
          </div>
          <div>
            <span className="text-orange-500 font-bold mr-4">
              Publish Year:
            </span>
            {book.publishYear || "N/A"}
          </div>
          <div>
            <span className="text-orange-500 font-bold mr-4">Last Update:</span>
            {book.updatedAt ? new Date(book.updatedAt).toString() : "N/A"}
          </div>
          <div>
            <span className="text-orange-500 font-bold mr-4">Create Date:</span>
            {book.createdAt ? new Date(book.createdAt).toString() : "N/A"}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBookPage;
