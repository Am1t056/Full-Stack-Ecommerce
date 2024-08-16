import React from 'react'
import successImage from "../assest/success.gif"
import { FaArrowRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'


const PaymentSuccess = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
  
    <div className='bg-slate-900 w-full max-w-lg mx-auto flex justify-center items-center flex-col gap-3 p-4 rounded'>
        <img className='rounded-3xl mt-5' width={250} height={150} src={successImage} alt="" />
        <p className='font-bold text-xl text-green-500'>Payment Successfull</p>
        <Link to="/order" className='text-slate-900 font-semibold py-2 px-3 bg-white rounded-md hover:bg-green-600 hover:text-white border-2 border-green-600 hover:border-slate-50 flex items-center gap-2'>Go to Order Page <FaArrowRight/></Link>
    </div>
    </div>
  )
}

export default PaymentSuccess