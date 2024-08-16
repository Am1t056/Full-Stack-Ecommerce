const userModel=require("../../models/userModel")
async function userDetailController(req,res){
    try {
        console.log("user id",req.userId)
        const user = await userModel.findById(req.userId)
        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"User detail"
        })
        console.log(user)
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}
module.exports=userDetailController