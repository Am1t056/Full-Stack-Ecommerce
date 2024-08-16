import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop';
import displayNepCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';

const SearchProductCard = ({loading,data=[]}) => {
    const loadingList = new Array(13).fill(null);
    
  const { fetchUserAddToCart } = useContext(Context);
  const handleAddToCart=async(e,id)=>{
    await addToCart(e,id);
    fetchUserAddToCart();
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all" >

  
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
                  <Link to={"/product/"+product?._id} className="w-full  bg-white rounded-sm shadow" key={product + index} onClick={scrollTop}>
                  <div className="bg-slate-200 h-48 p-4  flex justify-center items-center">
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
  )
}

export default SearchProductCard