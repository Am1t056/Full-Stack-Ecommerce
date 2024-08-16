const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct=async(req,res)=>{
    try {
        const currentUser=req.userId

        const productId=req.body._id

        const deleteProduct=await addToCartModel.deleteOne({_id:productId})

        res.json({
            data:deleteProduct,
            error:false,
            success:true,
            message:"Product deleted successfully"
        })
    } catch (error) {
         res.json({
            message:error?.message || error,
            error:true,
            success:false
         })
    }
}

module.exports=deleteAddToCartProduct