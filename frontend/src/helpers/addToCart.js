import SummarApi from "../common"
import {toast} from "react-toastify"

const addToCart=async(e,id)=>{
  e?.stopPropagation()
  e?.preventDefault()

  const response=await fetch(SummarApi.addToCartProduct.url,{
    method:SummarApi.addToCartProduct.method,
    credentials:"include",
    headers:{
      "content-type":"application/json",
    },
    body:JSON.stringify({productId:id})
  })

  const dataResponse=await response.json()

  if(dataResponse.success){
    toast.success(dataResponse.message)
  }

  if(dataResponse.error){
    toast.error(dataResponse.message)
  }

  return dataResponse

  
}
export default addToCart