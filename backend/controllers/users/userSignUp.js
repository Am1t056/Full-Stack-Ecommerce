const userModel = require("../../models/userModel")
const bcrypt=require("bcryptjs")

async function userSignUpController(req,res){
    try {
      const {name,email,password}=req.body

      

      //since the email is unique in usermodel 
      const userExist=await userModel.findOne({email})
      if(userExist){
        throw new Error("User already exists!")
      }


      if(!email){
        throw new Error("Please provide email")
      }
      if(!password){
        throw new Error("Please provide password")
      }
      if(!name){
        throw new Error("Please provide name")
      }

      //for securing password in db
      const salt=bcrypt.genSaltSync(10);
      const hashedPassword=bcrypt.hashSync(password,salt)

      if(!hashedPassword){
        throw new Error("Password hashing failed")
      }

      const payload={
        ...req.body,
        role:"GENERAL",
        password:hashedPassword
      }
       
      //saving in db
      const userData=new userModel(payload)
      const saveUser=await userData.save()
      console.log(userData)

      res.status(201).json({
        data:saveUser,
        success:true,
        error: false,
        message:"User created successfully!"
      })    
    } catch (error) {
       
        res.json({
            message: error.message || error,
            error:true,
            success: false
        })
    }
}
module.exports=userSignUpController;