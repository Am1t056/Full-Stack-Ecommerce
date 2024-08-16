const productModel = require("../../models/productModel")

const getCategoryWiseProduct=async(req,res)=>{
    try {
        const {category}=req?.body || req?.query
        const categorywiseproducts=await productModel.find({category})

        res.json({
            data:categorywiseproducts,
            message:"Products",
            success:true,
            error:false
        })
        
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}
module.exports=getCategoryWiseProduct