const express=require('express')

const router=express.Router()

const userSignUpController=require("../controllers/users/userSignUp")
const userSignInController = require('../controllers/users/userSignIn')
const userDetailController = require('../controllers/users/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controllers/users/userLogout')
const allUsers = require('../controllers/users/allUsers')
const updateUser = require('../controllers/users/updateUser')
const UploadProductController = require('../controllers/products/uploadProduct')
const getProductController = require('../controllers/products/getProduct')
const updateProductController = require('../controllers/products/updateProduct')
const getCategoryProduct = require('../controllers/products/getProductCategoryOne')
const getCategoryWiseProduct = require('../controllers/products/getCategoryWiseProduct')
const getProductDetail = require('../controllers/products/getProductDetails')
const addToCartController = require('../controllers/users/addToCartController')
const countAddToCartProduct = require('../controllers/users/countAddToProduct')
const CartProductInformation = require('../controllers/users/CartInformation')
const updateAddToCartProduct = require('../controllers/users/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controllers/users/deleteAddToCartProduct')
const searchProduct = require('../controllers/products/searchProduct')
const filterProductController = require('../controllers/products/filterProduct')
const paymentController = require('../controllers/payment/paymentController')
const webHooks = require('../controllers/payment/paymentWebHook')
const orderController = require('../controllers/payment/order.controller')
const allOrdersController = require('../controllers/payment/allOrders.controller')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailController)
router.get("/userLogout",userLogout)


//admin panel
router.get("/all-users",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-products",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/getProductsCategory",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetail)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)


//usser add to cart
router.post("/addToCart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/ProductInCartInformation",authToken,CartProductInformation)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

//payment and order
router.post("/checkout",authToken,paymentController)
router.post("/webhook",webHooks)
router.get("/order-list",authToken,orderController)
router.get("/all-order",authToken,allOrdersController)




module.exports=router