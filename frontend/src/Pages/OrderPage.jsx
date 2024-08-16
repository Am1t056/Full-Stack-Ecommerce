import React, { useEffect, useState } from "react";
import SummarApi from "../common";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import moment from "moment";
import displayNepCurrency from "../helpers/displayCurrency";

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderList = async () => {
    const response = await fetch(SummarApi.orderPage.url, {
      method: SummarApi.orderPage.method,
      credentials: "include",
    });

    const responseData = await response.json();

    setData(responseData.data);
  };

  useEffect(() => {
    fetchOrderList();
  }, []);
  console.log(data, "order-details");
  return (
    <div>
      {data.length == 0 && (
        <>
          <p>No Orders yet</p>
          <Link to="/">
            Home Page <FaArrowRight />
          </Link>
        </>
      )}

      <div className="p-4 w-full ">
        {data.map((item, index) => {
          return (
            <div key={index}>
              <p className="font-medium text-lg ">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="border border-slate-500 rounded">

             <div className="flex flex-col lg:flex-row justify-between">
             <div className="grid gap-1 ">
                {item?.productDetails.map((product, index) => {
                  return (
                    <div key={product.productId + index} className="flex gap-3 bg-slate-100">
                      <img
                        className="w-28 h-28 bg-slate-200 object-scale-down p-2"
                        src={product.productImage[0]}
                        alt=""
                      />
                      <div>
                        <div className="font-medium text-lg text-ellipsis line-clamp-1">{product.name}</div>
                        <div className="flex items-center gap-5 mt-1">
                          <div className="text-lg text-red-500">{displayNepCurrency(product.price)}</div>
                          <p>Quantity :{product.quantity}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            
              <div className="flex gap-4 flex-col min-w-[300px] p-2">
              <div>
                <div className="text-lg font-medium">Payment Details : </div>
                <p className="ml-1">
                  Payment Method Type :{" "}
                  {item.paymentDetails.payment_method_type[0]}
                </p>
                <p className=" ml-1">Payment Status: {item.paymentDetails.patment_status}</p>
              </div>

              <div>
                <div className="text-lg font-medium">Shipping Details:</div>
                {item.shipping_options.map((shipping, index) => {
                  return (
                    <div className=" ml-1" key={shipping.shipping_rate + index}>
                      Shipping Amount: {shipping.shipping_amount}
                    </div>
                  );
                })}
              </div>
              </div>
             </div>

         
                <div className="font-semibold ml-auto w-fit lg:text-lg ">Total Amount : {item.totalAmount}</div>
             
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
