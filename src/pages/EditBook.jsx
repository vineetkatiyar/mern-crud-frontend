/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBookPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishyear, setPublishYear] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/book/${id}`)
      .then((response) => {
        if (response.data) {
          setTitle(response.data.title);
          setAuthor(response.data.author);
          setPublishYear(response.data.publishyear);
          setLoading(false);
        } else {
          navigate("/"); // Redirect if no book found
        }
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setError("Failed to fetch book details.");
        setLoading(false);
      });
  }, [id, navigate]);

  const handleEditBook = async (e) => {
    e.preventDefault();
    const data = { title, author, publishyear };

    try {
      await axios.put(`http://localhost:8000/book/${id}`, data);
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
      setError("Failed to update book.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Update Book</h1>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleEditBook} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block font-medium">Book Title:</label>
            <input
              className="w-full border border-gray-400 px-3 py-2 rounded"
              placeholder="Enter book title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Author Field */}
          <div>
            <label className="block font-medium">Author:</label>
            <input
              className="w-full border border-gray-400 px-3 py-2 rounded"
              placeholder="Enter author name"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          {/* Publish Year Field */}
          <div>
            <label className="block font-medium">Publish Year:</label>
            <input
              className="w-full border border-gray-400 px-3 py-2 rounded"
              placeholder="Enter publish year"
              type="number"
              value={publishyear}
              onChange={(e) => setPublishYear(Number(e.target.value))}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-2 rounded hover:bg-orange-700 transition"
          >
            Edit Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;
