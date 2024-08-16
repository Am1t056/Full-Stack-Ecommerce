const mongoose=require('mongoose')

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
      
    } catch (error) {
        console.log(error)
        console.log("Failed to connect database!")
    }
}
module.exports=connectDB