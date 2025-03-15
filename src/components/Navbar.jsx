import { Link } from "react-router-dom";
import { GrUserManager } from "react-icons/gr";

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-gray-600 flex  items-center text-white font-bold text-xl justify-between px-10">
      <div className="items-center">
        <ul className="flex justify-center">
          <li className="pr-3">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="pl-3">
            <Link to="/createbook">Create Book</Link>
          </li>
        </ul>
      </div>
      <div className="">
        <Link>
        <GrUserManager className="text-green-600 text-3xl"/>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
