const productModel = require("../../models/productModel")

const getCategoryProduct=async (req,res)=>{
    try {
        const productCategory=await productModel.distinct("category")
        console.log("catrgory",productCategory)

        //array to store one product from each catrgory
        const productByCategory=[]
        for(category of productCategory){
            const product=await productModel.findOne({category})

            if(product){
                productByCategory.push(product)
            }
        }

        res.status(200).json({
            message:"Category Product",
            data:productByCategory,
            error:false,
            success:true
        })



    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}
module.exports=getCategoryProduct