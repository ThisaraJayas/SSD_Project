import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminHome from './pages/AdminHome.tsx';
import AdminPost from './pages/AdminPost.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store.ts';

export default function AdminDashboard() {
  const { loginUser } = useSelector((state: RootState) => state.User);
  const navigate = useNavigate()
  console.log("USSS ",loginUser?.userType);
  // if(loginUser?.userType==='REGULAR'){
  //   navigate('/')
  // }
    const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  const renderSettingsContent = () => {
    switch (currentPath) {
      case 'home':
        return <AdminHome/>;
      case 'post':
        return <AdminPost/>;
      // Add cases for other settings
      default:
        return "...";
    }
  };
  return (
    <div><div className="h-screen mt-[4%] ">
    <div className="fixed  left-0 min-h-screen select-none border bg-gray-300 shadow">
    <Link to="/admin/home">
      <div className="[&>.tooltip]:hover:opacity-100 border-r-transparent h-14 w-16 cursor-pointer border-r-4 p-3">
        <div className="border-gray pointer-events-auto absolute flex h-10 w-10 items-center justify-center rounded-full border bg-white text-cyan-400 shadow duration-100 hover:translate-y-1 hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
          </svg>
        </div>
        <div className="tooltip absolute z-50 mt-3 ml-12 w-max rounded-md bg-gray-600 p-1 text-xs text-white opacity-0 shadow-md duration-200">Search Documents</div>
      </div>
      </Link>
      <Link to="/admin/post">
      <div className="border-r-orange-400 [&>.tooltip]:hover:opacity-100 h-14 w-16 cursor-pointer border-r-4 p-3">
        <div className="border-gray pointer-events-auto absolute flex h-10 w-10 items-center justify-center rounded-full border bg-white text-orange-400 shadow duration-100 hover:translate-y-1 hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <div className="tooltip absolute z-50 mt-3 ml-12 w-max rounded-md bg-gray-600 p-1 text-xs text-white opacity-0 shadow-md duration-200">Adjustments</div>
      </div>
      </Link>
  
      <div className="[&>.tooltip]:hover:opacity-100 border-r-transparent h-14 w-16 cursor-pointer border-r-4 p-3">
        <div className="border-gray pointer-events-auto absolute flex h-10 w-10 items-center justify-center rounded-full border bg-white text-red-400 shadow duration-100 hover:translate-y-1 hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <div className="tooltip absolute z-50 mt-3 ml-12 w-max rounded-md bg-gray-600 p-1 text-xs text-white opacity-0 shadow-md duration-200">Reports</div>
      </div>
  
      <div className="[&>.tooltip]:hover:opacity-100 border-r-transparent h-14 w-16 cursor-pointer border-r-4 p-3">
        <div className="border-gray pointer-events-auto absolute flex h-10 w-10 items-center justify-center rounded-full border bg-white text-green-400 shadow duration-100 hover:translate-y-1 hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="tooltip absolute z-50 mt-3 ml-12 w-max rounded-md bg-gray-600 p-1 text-xs text-white opacity-0 shadow-md duration-200">Revenue</div>
      </div>
  
      <div className="mx-auto my-4 w-5 border-t border-solid border-gray-400"></div>
  
      <div className="[&>.tooltip]:hover:opacity-100 h-14 w-16 cursor-pointer">
        <div className="pointer-events-auto absolute flex h-14 w-16 items-center justify-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div className="tooltip absolute mt-3 ml-12 w-max rounded-md bg-gray-600 p-1 text-xs text-white opacity-0 shadow-md duration-200">Add More</div>
      </div>
    </div>
    <div className='ml-28 mt-[5%]'>
    {renderSettingsContent()}
    </div>
  </div>
  </div>
  )
}
