import React, { useEffect, useState } from "react";
import UploadProduct from "../Components/UploadProduct";
import SummarApi from "../common";
import AdminProductCard from "../Components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const handleUploadProduct = () => {
    setOpenUploadProduct(!openUploadProduct);
  };


  const [allProducts, setAllProducts] = useState([]);
 const fetchAllProduct=async()=>{
  const dataResponse=await fetch(SummarApi.allProduct.url)

  const dataApi=await dataResponse.json()
  console.log("product-Data",dataApi.data)
  setAllProducts(dataApi.data || [])
 }

 useEffect(()=>{
 fetchAllProduct()
 },[])
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          onClick={handleUploadProduct}
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-4 rounded-full"
        >
          Upload Product
        </button>
      </div>


      {/* To show all the products */  }
      <div className="flex items-center flex-wrap gap-5 py-4 overflow-y-scroll h-[calc(100vh-190px)]">
        {allProducts.map((product,index)=>{
          return(
            <AdminProductCard data={product} key={index + "allProducts"} fetchData={fetchAllProduct}/>
            
          )
        })}
      </div>


      {/* Upload product component */}
      {openUploadProduct && <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>}
        
    </div>
  );
};

export default AllProducts;
