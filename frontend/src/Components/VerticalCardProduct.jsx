import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCatgoryWiseProduct";
import displayNepCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);
  const handleAddToCart=async(e,id)=>{
    await addToCart(e,id);
    fetchUserAddToCart();
  }

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  //scrolling through the buttons
  const [scroll,setScroll]=useState(0)
  const scrollElement=useRef()

  const scrollRight=()=>{
    scrollElement.current.scrollLeft +=300
  }

  
  const scrollLeft=()=>{
    scrollElement.current.scrollLeft -=300
  }
  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
    <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all" ref={scrollElement}>

    <button
              onClick={scrollLeft} 
              className="bg-white shadow-md rounded-full p-1 mx-2 absolute left-0 text-lg hidden md:block"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={scrollRight}
              className="bg-white shadow-md rounded-full p-1 mx-2 absolute right-0 text-lg hidden md:block"
            >
              <FaAngleRight />
            </button>
    {
        loading ? (
           loadingList.map((product,index)=>{
                return(
                  <div className="w-full  min-w-[280px] md:min-w-[380px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow" key={product + index}>
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse">
                   
                  </div>
                  <div className="p-4 grid gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-2 animate-pulse rounded-full bg-slate-200"></h2>
                    <p className=" capitalize text-slate-500 p-2 animate-pulse rounded-full bg-slate-200"></p>
                    <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                      <p className="text-red-600 font-medium bg-slate-200 p-2 rounded-full animate-pulse w-full"></p>
                      <p className="text-slate-500 line-through bg-slate-200 p-2 rounded-full animate-pulse w-full"></p>
                    </div>
                    <button className="bg-slate-200 text-white px-3 mt-2 rounded-full text-nowrap p-2 animate-pulse">
                  
                    </button>
                  </div>
                </div>
                )
              })
        ):(
            data.map((product,index)=>{
                return(
                  <Link to={"product/"+product?._id} className="w-full  min-w-[280px] md:min-w-[380px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow" key={product + index}>
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                    <img src={product.productImage[0]} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"/>
                  </div>
                  <div className="p-4 grid gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                    <p className=" capitalize text-slate-500">{product?.category}</p>
                    <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                      <p className="text-red-600 font-medium">{displayNepCurrency(product?.sellingPrice) }</p>
                      <p className="text-slate-500 line-through">{displayNepCurrency(product?.price)}</p>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 mt-2 rounded-full text-nowrap"  onClick={(e)=>handleAddToCart(e,product?._id)}>
                      Add to Cart
                    </button>
                  </div>
                </Link>
                )
              })
        )
       
      }
    </div>
   
    </div>
  );
};

export default VerticalCardProduct;
