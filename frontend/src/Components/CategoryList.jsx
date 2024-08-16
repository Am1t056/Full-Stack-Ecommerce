import React, { useEffect, useState } from "react";
import SummarApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const dataResponse = await fetch(SummarApi.ProductCategory.url);
    const dataApi = await dataResponse.json();
    console.log("categoryList", dataApi.data);
    setLoading(false);
    setProductCategory(dataApi.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    <div className="container mx-auto p-4 overflow-x-scroll scrollbar-none">
      <div className="flex items-center gap-4 justify-between">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse" key={"categoryLoading"+index}>

                </div>
              );
            })
          : productCategory.map((a, index) => {
              return (
                <Link
                  to={`/product-category?category=` + a?.category}
                  key={a + index}
                  className=" cursor-pointer"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-4 bg-slate-200 overflow-hidden flex items-center justify-center">
                    <img
                      src={a?.productImage[0]}
                      alt={a?.category}
                      className="w-full h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {a?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
