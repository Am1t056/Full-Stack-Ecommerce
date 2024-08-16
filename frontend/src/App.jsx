import React, { useEffect, useState } from "react";
import Home from "./Pages/Home";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummarApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./redux/userSlice";

const App = () => {
  //for cart count
  const [cartCount, setCartCount] = useState(0);

  //for user details
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummarApi.userDetails.url, {
      method: SummarApi.userDetails.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
    console.log(dataResponse);
  };

  const fetchUserAddToCart = async () => {
    const response = await fetch(SummarApi.addToCartProductCount.url, {
      method: SummarApi.addToCartProductCount.method,
      credentials: "include",
    });
    const dataApi = await response.json();

    console.log(dataApi, "data Api cart count");
    setCartCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();

    fetchUserAddToCart();
  }, [fetchUserDetails,fetchUserAddToCart]);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //user details fetch
          cartCount, //currunt user cart count
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />

        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
};

export default App;
