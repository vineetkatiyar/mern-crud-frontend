/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const CreateBookPage = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .min(4, "Title must be at least 4 characters")
      .max(50, "Title cannot exceed 50 characters"),
    author: yup
      .string()
      .required("Author is required")
      .min(5, "Author name must be at least 5 characters")
      .max(200, "Author name cannot exceed 200 characters"),
    publishyear: yup
      .number()
      .typeError("Publish year must be a number")
      .required("Publish year is required")
      .min(1500, "Year must be greater than 1500")
      .max(new Date().getFullYear(), "Year cannot be in the future"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitBook = async (data) => {
    try {
      await axios.post(`http://localhost:8000/book`, data);
      navigate("/");
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Create Book</h1>
        <form onSubmit={handleSubmit(handleSubmitBook)} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block font-medium">Book Title:</label>
            <input
              id="title"
              className="w-full border border-gray-400 px-3 py-2 rounded"
              placeholder="Enter book title"
              type="text"
              {...register("title")}
            />
            <p className="text-red-600 text-sm">{errors.title?.message}</p>
          </div>

          {/* Author Field */}
          <div>
            <label htmlFor="author" className="block font-medium">Author:</label>
            <input
              id="author"
              className="w-full border border-gray-400 px-3 py-2 rounded"
              placeholder="Enter author name"
              type="text"
              {...register("author")}
            />
            <p className="text-red-600 text-sm">{errors.author?.message}</p>
          </div>

          {/* Publish Year Field */}
          <div>
            <label htmlFor="publishyear" className="block font-medium">Publish Year:</label>
            <input
              id="publishyear"
              className="w-full border border-gray-400 px-3 py-2 rounded"
              placeholder="Enter publish year"
              type="number"
              {...register("publishyear")}
            />
            <p className="text-red-600 text-sm">{errors.publishyear?.message}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
          >
            Create Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookPage;
