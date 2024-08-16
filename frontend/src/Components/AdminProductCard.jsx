import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayNepCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40 flex justify-center items-center flex-col gap-2">
     <div className="w-32 h-32 flex justify-center items-center" >
     <img
          src={data?.productImage[0]}
        
          alt={data?.productName}
          className="mx-auto object-fill h-full"
        />
     </div>
        <p className="font-medium">{displayNepCurrency(data?.sellingPrice)}</p>
        <h1 className="text-center font-bold text-ellipsis line-clamp-2">{data.productName}</h1>

        <div
          className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full cursor-pointer hover:text-white"
          onClick={() => setEditProduct(true)}
        >
          <MdModeEditOutline />
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;