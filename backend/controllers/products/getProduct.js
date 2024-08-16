const productModel = require("../../models/productModel")

async function getProductController(req,res){
    try {
        const products=await productModel.find().sort({createdAt:-1})


        res.status(200).json({
            message:"Product fetched succesfully",
            success:true,
            error:false,
            data:products
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error:true,
            success:false
        })
    }
}
module.exports=getProductController