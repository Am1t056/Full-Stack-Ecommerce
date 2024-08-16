import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummarApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../redux/userSlice";
import Role from "../common/role";
import Context from "../context";

const Header = () => {
  //context data
  const context = useContext(Context);
  console.log(context, "context");

  const user = useSelector((state) => state?.user?.user);
  console.log("User Header", user);
  //admin panel options on click
  const [menuDisplay, setMenuDisplay] = useState(false);

  //logout
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const fetchData = await fetch(SummarApi.logout_user.url, {
      method: SummarApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  //searching
  const navigate=useNavigate()
  const handleSearch=(e)=>{
const {value}=e.target
setSearch(value)
if(value){
  navigate(`/search?q=${value}`)
}else{
  navigate(`/search`)
}
  }

  const searchInput=useLocation()
  const URLSearch=new URLSearchParams(searchInput?.search)
  const searchQuery=URLSearch.getAll("q")
const [search,setSearch]=useState(searchQuery)
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-50">
      <div className="container mx-auto h-full flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none "
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative  flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegUserCircle />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className=" absolute top-11 h-fit bottom-0 bg-white p-2 shadow-lg rounded">
                <nav>
                  {user?.role === Role.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <Link to={'/order'}  onClick={() => setMenuDisplay((prev) => !prev)} className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2" >Order</Link>
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl cursor-pointer relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3">
                <p className="text-xs ">{context?.cartCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-700 hover:shadow-md"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-700 hover:shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
