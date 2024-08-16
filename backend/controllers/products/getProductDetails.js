const productModel = require("../../models/productModel")

const getProductDetail=async(req,res)=>{
    try {

        const {id}=req.body
        const productDetail=await productModel.findById(id)

        res.status(200).json({
            data:productDetail,
            message:"product detail fetched successfully",
            success:true,
            error:false
        })
        
    } catch (error) {
        res.json({
            message:error?.message || error,
            error:true,
            success:false
        })
        
    }
}
module.exports=getProductDetail