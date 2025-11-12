import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import { dummyUserData } from "../assets/assets";
import Loading from "../Components/Loading";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const user = dummyUserData;

  return user ? (
    <div className="w-full flex h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 bg-slate-50">
        <Outlet />
      </div>
      {
        sidebarOpen ?
        // TODO : add the button for closing sidebar
        <X className="absolute top-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden" onClick={() => setSidebarOpen(false)} />
        : 
        <MenuIcon className="absolute top-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden" onClick={() => setSidebarOpen(true)} />
      }
    </div>
  ) : (
    <Loading />
  )

}

export default Layout
