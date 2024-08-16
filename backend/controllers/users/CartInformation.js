const addToCartModel = require("../../models/cartProduct")

const CartProductInformation=async(req,res)=>{
    try {
        const currentUser=req.userId
        const productInCart=await addToCartModel.find({
         userId:currentUser
        }).populate("productId")


        res.json({
            data:productInCart,
            message:"Product in cart",
            success:true,
            error:false
        })
        
    } catch (error) {
        res.json({
            message:error?.message || error,
            success:false,
            error:true
        })
    }
}

module.exports=CartProductInformation