
import React from 'react'
import cancelImage from "../assest/cancel.gif"
import { FaCartShopping } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const PaymentCancel = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
  
    <div className='bg-slate-900 w-full max-w-lg mx-auto flex justify-center items-center flex-col gap-3 p-4 rounded'>
        <img className='rounded-3xl mt-5' width={250} height={150} src={cancelImage} alt="" />
        <p className='font-bold text-xl text-red-500'>Payment Failed!</p>
        <Link to="/cart" className='text-slate-900 font-semibold py-2 px-3 bg-white rounded-md hover:bg-red-600 hover:text-white border-2 border-red-600 hover:border-slate-50 flex items-center gap-2'>Go to Cart<FaCartShopping/></Link>
    </div>
    </div>
  )
}

export default PaymentCancel