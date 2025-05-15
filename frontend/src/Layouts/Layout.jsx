import{ React, useEffect} from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";



export default function Layout() {
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    }
  }, []);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow px-2">
        <Navbar />
        <div className="flex-grow bg-gray-100 rounded-lg p-5 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}