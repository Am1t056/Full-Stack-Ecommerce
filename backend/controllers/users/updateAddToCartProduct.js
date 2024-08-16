const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct=async(req,res)=>{
      try {

        const currentUser=req.userId

        const cartsProductId=req?.body?._id;

        const qty=req.body.quantity

        const updateProduct=await addToCartModel.updateOne({_id:cartsProductId},{
            ...(qty && {quantity:qty})
        })


        res.json({
            message:"Cart Product Update",
            data:updateProduct,
            error:false,
            success:true
        })

        
      } catch (error) {
          res.json({
            message:error?.messsage || error,
            success:false,
            error:true
          })
      }
}
module.exports=updateAddToCartProduct