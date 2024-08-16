import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SummarApi from '../common'
import { useState } from 'react'
import SearchProductCard from '../Components/SearchProductCard'

const SearchProduct = () => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const query=useLocation()
    console.log(query.search,"query")

    const fetchQuery=async()=>{
        setLoading(true)
        const response=await fetch(SummarApi.searchProduct.url+query.search)
        const dataResponse=await response.json()
        // console.log(dataResponse)
        setLoading(false)
        setData(dataResponse.data)
    }

    useEffect(()=>{
        fetchQuery()
    },[query])
  return (
    <div className='container mx-auto p-4'>
        {
           loading && (
            <p className='text-lg text-center'>Loading...</p>

           ) 
        }
        <p className='text-lg font-semibold my-3'>Search Results: {data.length}</p>

        {
          data.length === 0 && !loading && (
            <p className='bg-white text-lg text-center'>No Data Found....</p>
          )  
        }

        {
            data.length !==0 && !loading && (
               
                      <SearchProductCard loading={loading} data={data}/>
                  
            )
        }

    </div>
  )
}

export default SearchProduct