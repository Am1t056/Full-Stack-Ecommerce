import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgetPassword from "../Pages/ForgetPassword";
import SignUp from "../Pages/SignUp";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers";
import AllProducts from "../Pages/AllProducts";
import CategoryProduct from "../Pages/CategoryProduct";
import ProductDetail from "../Pages/ProductDetail";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/SearchProduct";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentCancel from "../Pages/PaymentCancel";
import OrderPage from "../Pages/OrderPage";
import AllOrders from "../Pages/AllOrders";

const router=createBrowserRouter([
    {
        path:"/",
       element: <App/>,
       children:[
        {
            path: "",
            element: <Home/>
        },
        {
            path:"login",
            element:<Login/>
        },
        {
            path:"forget-password",
            element: <ForgetPassword/>
        },
        {
            path:"sign-up",
            element:<SignUp/>
        },
        {
            path:"product-category",
            element:<CategoryProduct/>
        },
        {
            path:"product/:id",
            element:<ProductDetail/>
        },
        {
          path:"cart",
          element:<Cart/>
        },
        {
            path:"success",
            element:<PaymentSuccess/>
        },
        {
           path:"search",
           element:<SearchProduct/>
        },
        {
            path:"cancel",
            element:<PaymentCancel/>
        },
        {
            path:"order",
            element:<OrderPage/>
        },
        {
            path:"admin-panel",
            element:<AdminPanel/>,
            children:[
                {
                    path:"all-users",
                    element:<AllUsers/>
                },{
                    path:"all-products",
                    element:<AllProducts/>
                },
                {
                    path:"all-order",
                    element:<AllOrders/>
                }
            ]
        }
       ]
    }
])

export default router