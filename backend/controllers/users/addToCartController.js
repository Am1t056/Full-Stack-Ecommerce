const addToCartModel = require("../../models/cartProduct")

const addToCartController=async (req,res)=>{
    try {
        const {productId}=req?.body
        const currentUser=req.userId

        const isProductAvailable=await addToCartModel.findOne({productId,userId: currentUser})

  

        if(isProductAvailable){
            return res.json({
                message:"Product is already in your cart",
                success:false,
                error:true
            })
        }


        const payload={
            productId:productId,
            userId:currentUser,
            quantity:1
        }

        const newAddToCart=await addToCartModel(payload)
        const saveProduct=await newAddToCart.save()

        res.json({
            message:"Product added to cart successfully",
            success:true,
            error:false,
            data:saveProduct
        })
   
        
    } catch (error) {
        res.json({
            message:error?.message || error,
            error:true,
            success:false
        })
    }
}

module.exports=addToCartController