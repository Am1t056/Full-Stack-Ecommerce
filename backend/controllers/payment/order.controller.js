const orderModel = require("../../models/orderModel")

const orderController=async(req,res)=>{
    try {
        const currentUserId=req.userId

        const orderList = await orderModel.find({userId: currentUserId}).sort({createdAt: -1})


        res.status(200).json({
            data:orderList,
            message:"Order list fetched successfully",
            error:false,
            success:true
        })
        
    } catch (error) {
       res.status(500).json({
        message:error?.message || error,
        error:true,
        success:false
       }) 
    }
}

module.exports=orderController