import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spiner from "../components/Spiner";
import { useDeleteBook } from "../../hooks/useDeleteBook";

const Home = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate, isLoading, isError, error } = useDeleteBook();

  const handleDeleteBook = () => {
    mutate(id, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <div>
      <BackButton />
      <h1 className="text-4xl my-4">Delete Book</h1>
      {isLoading ? <Spiner /> : ""}
      <div className="flex flex-col w-[500px] items-center mx-auto border-2 border-gray-700 p-10 rounded">
        <h1 className="text-2xl mb-2">Are you want to sure Delete this BooK</h1>

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error.message}
          </div>
        )}

        <div className="flex space-x-4 w-full">
          <button
            onClick={() => navigate(-1)}
            disabled={isLoading}
            className={`p-3 text-gray-800 w-1/2 ${
              isLoading ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteBook}
            disabled={isLoading}
            className={`p-3 text-white w-1/2 ${
              isLoading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoading ? "Deleting..." : "Delete Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
