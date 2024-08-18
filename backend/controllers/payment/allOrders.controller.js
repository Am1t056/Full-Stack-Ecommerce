const orderModel = require("../../models/orderModel")
const userModel = require("../../models/userModel")

const allOrdersController=async(req,res)=>{
    const userId=req.userId
    const user=await userModel.findById(userId)

    if(user.role !== 'ADMIN'){
        return res.status(401).json({message:'You are not authorized to access this route.'})
    }

    const AllOrder=await orderModel.find().sort({createdAt : -1})

    return res.status(200).json({
        data:AllOrder,
        message:'All Orders Retrieved Successfully',
        error:false,
        success:true
    })
}

module.exports=allOrdersController