import React, { useEffect } from 'react'
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Role from '../common/role';


const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate=useNavigate()

  useEffect(()=>{
    if(user?.role !== Role.ADMIN){
      navigate("/")
    }

  },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60 customshadow'>
          <div className='h-32  flex justify-center flex-col items-center'>
          <div className="text-5xl cursor-pointer relative flex justify-center">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-20 h-20 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegUserCircle />
              )}
            </div>
            <p className=' capitalize text-lg font-semibold'>{user?.name}</p>
            <p className='text-sm'>{user?.role}</p>
          </div>

          {/* navigation */}
          <div>
            <nav className='grid p-4'>
              <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
              <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All Products</Link>
              <Link to={"all-order"} className='px-2 py-1 hover:bg-slate-100'>All Orders</Link>

            </nav>
          </div>
        </aside>
        <main className='w-full h-full p-4'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel