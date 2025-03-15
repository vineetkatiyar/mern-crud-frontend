import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spiner from "../components/Spiner";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://backend-crud-mern.onrender.com/${id}`)
      .then(() => {
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <BackButton />
      <h1 className="text-4xl my-4">Delete Book</h1>
      {loading ? <Spiner /> : ""}
      <div className="flex flex-col w-[500px] items-center mx-auto border-2 border-gray-700 p-10 rounded">
        <h1 className="text-2xl mb-2">Are you want to sure Delete this BooK</h1>
        <button
          onClick={handleDeleteBook}
          className="p-3 text-white bg-red-600 w-full"
        >
          yes! Delete
        </button>
      </div>
    </div>
  );
};

export default Home;
