const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    // console.log(token)

    if (!token) {
      return res.status(200).json({
         message: "Please Login first!",
         error:true,
         success:false
         });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      console.log(err);
      console.log("decoded", decoded);
      if(err){
        console.log("error auth",err)  
      }

      req.userId=decoded?._id
      next()
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: [],
      error: true,
      success: false,
    });
  }
}
module.exports = authToken;
