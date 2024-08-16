import React, { useContext, useEffect, useState } from "react";
import SummarApi from "../common";
import Context from "../context";
import displayNepCurrency from "../helpers/displayCurrency";
import {MdDelete} from "react-icons/md"
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const context = useContext(Context);

  const loadingCart = new Array(context.cartCount).fill(null);

  const [cartInfo, setCartInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCartInformation = async () => {

    const response = await fetch(SummarApi.ProductCartInformation.url, {
      method: SummarApi.ProductCartInformation.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataApi = await response.json();

    if (dataApi.success) {
      setCartInfo(dataApi.data);
    }
  };


  const handleLoading=async()=>{
    setLoading(true);
     await fetchCartInformation();
      setLoading(false)

  }
  useEffect(() => {
    handleLoading()
 
  }, []);


  //Quantity Increase backend api fetch
  const increaseQty=async(id,qty)=>{
       const response=await fetch(SummarApi.updateCartProduct.url,{
        method:SummarApi.updateCartProduct.method,
        credentials:"include",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          _id:id,
          quantity:qty+1
        })
       })

       const dataApi=await response.json()

       if(dataApi.success){
         fetchCartInformation()
       }
  }

//Quantity deccrease backend api fetch
   const decreaseQty=async(id,qty)=>{
   if(qty>1){
    const response=await fetch(SummarApi.updateCartProduct.url,{
      method:SummarApi.updateCartProduct.method,
      credentials:"include",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        _id:id,
        quantity:qty-1
      })
     })
 
     const dataApi=await response.json()
 
     if(dataApi.success){
       fetchCartInformation()
     }
   }
}

//fetch delete cart api
const deleteProduct=async(id)=>{
  const response=await fetch(SummarApi.deleteCartProduct.url,{
    method:SummarApi.deleteCartProduct.method,
    credentials:"include",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify({
      _id:id,
 
    })
   })

   const dataApi=await response.json()

   if(dataApi.success){
     fetchCartInformation()
     context.fetchUserAddToCart()
   }
}

const handlePayment=async()=>{

  const stripePromise =await loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);
 const response=await fetch(SummarApi.payment.url,{
  method:SummarApi.payment.method,
  credentials:"include",
  headers:{
    "content-type":"application/json"
  },
  body: JSON.stringify({
    cartItems: cartInfo
  })
 })

 const responseData=await response.json()

 if(responseData?.id){
  stripePromise.redirectToCheckout({sessionId:responseData.id})

 }
}

const totalQty=cartInfo.reduce((previousValue,currentValue)=>previousValue + currentValue.quantity, 0)
const totalPrice=cartInfo.reduce((prev,curr)=>prev+(curr?.quantity * curr?.productId?.sellingPrice),0)

  console.log(cartInfo, "cart-info");
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {cartInfo.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 lg:justify-between p-4">
        {/* Product in cart */}
        <div className="w-full max-w-7xl">
          {loading ? (
            loadingCart.map((el,index) => {
              return (
                <div
                  key={el+index}
                  className="w-full bg-slate-200 h-32 mb-2 border border-slate-300 animate-pulse rounded"
                ></div>
              );
            })
          ) : (
            cartInfo.map((item,index)=>{
                return(
                    <div key={item?._id} className="w-full bg-white h-32 mb-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]">
                        <div className="w-32 h-32 bg-slate-200">
                            <img src={item?.productId?.productImage[0]} className="w-full h-full p-2 object-scale-down mix-blend-multiply" />
                        </div>
                        <div className="px-4 py-2 relative">
                          {/* delete product */}
                          <div className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer" onClick={()=>deleteProduct(item?._id)}>
                           <MdDelete />
                          </div>


                            <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1 font-medium">{item?.productId?.productName}</h2>
                            <p className=" capitalize text-slate-500 font-medium">{item?.productId?.category}</p>
                            <div className="flex items-center justify-between">
                            <p className="text-red-600 font-medium text-lg">{displayNepCurrency(item?.productId?.sellingPrice)}</p>
                            <p className="text-slate-600 font-semibold text-lg">{displayNepCurrency(item?.productId?.sellingPrice * item?.quantity)}</p>

                            </div>
                            <div className="flex items-center gap-3 mt-1">
                                <button className=" border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white" onClick={()=>decreaseQty(item?._id,item?.quantity)}>-</button>
                                  <span>{item?.quantity}</span>
                                <button className=" border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white" onClick={()=>increaseQty(item?._id,item?.quantity)}>+</button>
                            </div>
                        </div>
                    </div>
                )
            })
          )}
        </div>

        {/* Total Product */}
      {
        cartInfo[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">

            </div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-700">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-700 mt-2">
                <p>Total Price</p>
                <p>{displayNepCurrency(totalPrice)}</p>
              </div>

              <button className="bg-blue-600 p-2 text-white w-full mt-2" onClick={handlePayment}>Checkout</button>
            </div>
          )}
        </div>
        )
      }
      </div>
    </div>
  );
};

export default Cart;
