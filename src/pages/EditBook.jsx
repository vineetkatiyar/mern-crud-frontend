// src/components/EditBookPage.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema } from "../../schema/bookSchema";
import { useBookById } from "../../hooks/useGetBookById";
import { useEditBook } from "../../hooks/useEditBook";

const EditBookPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch book data
  const { data: book, isLoading, isError, error } = useBookById(id);

  // Setup update functionality
  const updateMutation = useEditBook();

  // Setup React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      publishyear: undefined,
    },
  });

  // Pre-fill form when book data loads
  React.useEffect(() => {
    if (book) {
      reset({
        title: book.title || "",
        author: book.author || "",
        publishyear: book.publishyear ? Number(book.publishyear) : undefined,
      });
    }
  }, [book, reset]);

  // Handle form submission
  const onSubmit = (data) => {
    updateMutation.mutate(
      { id, ...data },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-lg">Loading book details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">Error</h1>
          <p className="text-red-500 mb-4">{error.message}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Update Book</h1>

        {/* Show error if update fails */}
        {updateMutation.isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {updateMutation.error.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Book Title:
            </label>
            <input
              id="title"
              className={`w-full border px-3 py-2 rounded ${
                errors.title ? "border-red-500" : "border-gray-400"
              }`}
              placeholder="Enter book title"
              type="text"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Author Field */}
          <div>
            <label htmlFor="author" className="block font-medium mb-1">
              Author:
            </label>
            <input
              id="author"
              className={`w-full border px-3 py-2 rounded ${
                errors.author ? "border-red-500" : "border-gray-400"
              }`}
              placeholder="Enter author name"
              type="text"
              {...register("author")}
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Publish Year Field */}
          <div>
            <label htmlFor="publishyear" className="block font-medium mb-1">
              Publish Year:
            </label>
            <input
              id="publishyear"
              className={`w-full border px-3 py-2 rounded ${
                errors.publishyear ? "border-red-500" : "border-gray-400"
              }`}
              placeholder="Enter publish year"
              type="number"
              {...register("publishyear", { valueAsNumber: true })}
            />
            {errors.publishyear && (
              <p className="text-red-500 text-sm mt-1">
                {errors.publishyear.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={updateMutation.isLoading}
            className={`w-full text-white font-semibold py-2 rounded transition ${
              updateMutation.isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {updateMutation.isLoading ? "Updating..." : "Update Book"}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full bg-gray-600 text-white font-semibold py-2 rounded hover:bg-gray-700 transition mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;
