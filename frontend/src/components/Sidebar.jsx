import { Link, useNavigate } from "react-router-dom";

import { FaHome, FaSearch } from "react-icons/fa";
import { MdStorage, MdOutlineManageAccounts } from "react-icons/md";
import { SiFuturelearn } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";

function Sidebar() {
  const navigate = useNavigate()
  return (
    <div className="w-[250px] bg-gray-100 h-screen p-5 text-black flex flex-col justify-between">
      <div>
        <div className="text-center mb-4 py-4">
          <Link
            to="/dashboard"
            className="text-4xl font-bold text-black no-underline"
          >
            DocBox
          </Link>
        </div>

        <ul className="space-y-6">
        <li className="flex items-center hover:bg-teal-600 hover:rounded-md group  focus:bg-teal-600">
           <FaHome className="text-2xl text-teal-600 mr-2 cursor-pointer group-hover:text-white" />
          <Link
           to="/dashboard"
           className="text-lg text-gray-900 no-underline px-3 py-2 block w-full"
           >
           All
           </Link>
          </li>
          <li className="flex items-center hover:bg-teal-600 hover:rounded-md group">
            <FaSearch className="text-2xl text-teal-600 mr-2 cursor-pointer  group-hover:text-white" />
            <Link
              to="assets"
              className="text-lg text-gray-900 no-underline px-3 py-2 block w-full"
            >
              Assets
            </Link>
          </li>

          <li className="flex items-center hover:bg-teal-600 hover:rounded-md group">
            <MdStorage className="text-2xl text-teal-600 mr-2 cursor-pointer  group-hover:text-white" />
            <Link
              to="addtool"
              className="text-lg text-gray-900 no-underline px-3 py-2 block w-full"
            >
              Add New Asset
            </Link>
          </li>

          <li className="flex items-center hover:bg-teal-600 hover:rounded-md group">
            <MdOutlineManageAccounts className="text-2xl text-teal-600 mr-2 cursor-pointer  group-hover:text-white" />
            <Link
              to="manage"
              className="text-lg text-gray-900 no-underline px-3 py-2 block w-full"
            >
              Manage
            </Link>
          </li>

          <li className="flex items-center hover:bg-teal-600 hover:rounded-md group">
            <SiFuturelearn className="text-2xl text-teal-600 mr-2 cursor-pointer  group-hover:text-white" />
            <Link
              to="future"
              className="text-lg text-gray-900 no-underline px-3 py-2 block w-full"
            >
              Future
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-8 p-3 bg-teal-600 rounded-lg text-center">
        <IoSettingsSharp className="text-2xl text-white inline-block mr-2" />
        <button
          
          className="text-white text-lg no-underline align-middle"
          onClick={()=>{navigate("/auth/login")}}
        >
          LogOut
        </button>
      </div>
    </div>
  );
}

export default Sidebar;