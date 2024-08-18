const bcrypt=require("bcryptjs")
const userModel = require("../../models/userModel")
const jwt=require("jsonwebtoken")



async function userSignInController(req,res){
try {

    const {email,password}=req.body
    if(!email){
        throw new Error("Please provide email")
    }
    if(!password){
        throw new Error("Please provide password")
    }

    //find email to ensure it matches
    const user=await userModel.findOne({email})
    if(!user){
        throw new Error("User not found")
    }

    //compare password ==> current password from payload and database password
    const isMatch=bcrypt.compareSync(password,user.password)
    console.log(isMatch)

    if(isMatch){
        const tokenData={
           _id:user._id,
           email:user.email
        }
        const token=jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn: 60*60*8});
        const tokenOption={
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }
        res.cookie("token",token,tokenOption).json({
            message:"Logged In Successfully",
            data:token,
            success:true,
            error:false
        })

    }else{
        throw new Error("Invalid Credentials!")
    }
    


} catch (error) {
    res.json({
        message: error.message || error,
        error:true,
        success: false
    }) 
}
}
module.exports=userSignInController