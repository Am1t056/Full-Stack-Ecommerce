import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import SearchProductCard from "../Components/SearchProductCard";
import SummarApi from "../common";

const CategoryProduct = () => {
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false)

const navigate=useNavigate()

const location=useLocation()
const urlSearch=new URLSearchParams(location.search)
const urlCategoryListInArray=urlSearch.getAll("category")
const urlCategoryListObject={}
urlCategoryListInArray.forEach(el=>{
  urlCategoryListObject[el]=true
})
// console.log(urlCategoryListObject,"urlobject")

// console.log("urlcategorylist",urlCategoryListInArray)

  const [selectCategory,setSelectCategory]=useState(urlCategoryListObject)
  const [filterCategoryList,setFilterCategoryList]=useState([])
  const fetchData=async()=>{
    const response=await fetch(SummarApi.filterProduct.url,{
      method:SummarApi.filterProduct.method,
    
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        category:filterCategoryList
      })
    })

    const dataResponse=await response.json()
    console.log(dataResponse)

    setData(dataResponse?.data || [])
  }



  const handleSelectCategory=(e)=>{
    const {name,value,checked}=e.target
  setSelectCategory((prev)=>{
    return{
     ...prev,[value]:checked
  }
  })
  }

  useEffect(()=>{
    const arrayOfCategory=Object.keys(selectCategory).map(categoryKeyName =>{
      if(selectCategory[categoryKeyName]){
        return categoryKeyName
      }

      return null
    }).filter(el=>el)

    setFilterCategoryList(arrayOfCategory)

    const urlFormat=arrayOfCategory.map((el,index)=>{
      if((arrayOfCategory.length - 1) === index){
        return `category=${el}`
      }

      return `category=${el}&&`
    })
    navigate("/product-category?"+urlFormat.join(""))
    // product-category?category=airpodes

  },[selectCategory])

  useEffect(()=>{
      fetchData()
  },[filterCategoryList])

  //sorting
  const [sortBy,setSortBy]=useState("")
  const handleSort=(e)=>{
    const {value}=e.target

    setSortBy(value)

    if(value === "asc"){
      setData(prev=>prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }

    if(value === "dsc"){
      setData(prev=>prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }


  }

  useEffect(() => {
   
  
  }, [sortBy])


  return(
    <div className="container mx-auto p-4">
          {/* desktop */}
          <div className="flex flex-col md:grid md:grid-cols-[200px,1fr]">
              {/* left */}
              <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">

                 {/* sort by */}
                 <div className="" >
                    <h3 className="text-base uppercase font-medium pb-1 text-slate-500 border-b boreder-slate-300">Sort By</h3>
                    <form className="text-sm flex flex-col gap-2 py-2">
                        <div className="flex items-center gap-3">
                            <input id="sort" type="radio" checked={sortBy === "asc"} name='sortBy' value={"asc"} onChange={handleSort}/>
                            <label htmlFor="sort">Price- Low to High</label>
                        </div>

                        <div className="flex items-center gap-3">
                            <input id="sorte" type="radio" checked={sortBy === "dsc"} name='sortBy' value={"dsc"}  onChange={handleSort}/>
                            <label htmlFor="sorte">Price- High to Low</label>
                        </div>
                    </form>
                    
                 </div>


                  {/* filter by */}
                  <div className="" >
                    <h3 className="text-base uppercase font-medium pb-1 text-slate-500 border-b boreder-slate-300">Category</h3>
                    <form className="text-sm flex flex-col gap-2 py-2">
                        {
                          productCategory.map((categoryName,index)=>{
                            return(
                              <div className="flex items-center gap-3" key={index}>
                                  <input type="checkbox" value={categoryName.value} name={"category"} checked={selectCategory[categoryName?.value]} id={categoryName.value} onChange={handleSelectCategory} />
                                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                              </div>
                            )
                          })
                        }
                    </form>
                    
                 </div>





              </div>

              {/* right */}
              <div className="px-4">
                <p className="font-medium text-slate-800 text-lg my-2">Search Results:{data.length}</p>
               <div className="min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll">
               {
                  data.length !== 0 && (
                    <SearchProductCard data={data} loading={loading}/>
                  )
                }
               </div>
              </div>

          </div>
    </div>
  ) ;
};

export default CategoryProduct;
