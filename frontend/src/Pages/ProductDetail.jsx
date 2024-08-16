import React, { useContext, useEffect } from "react";
import { useState } from "react";
import SummarApi from "../common";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayNepCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../Components/VerticalCardProduct";
import RecommendedProduct from "../Components/RecommendedProduct";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const ProductDetail = () => {

  const context = useContext(Context);
  // console.log(context, "context");

  const user = useSelector((state) => state?.user?.user);

  const [loading, setLoading] = useState(true);

  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImage, setZoomImage] = useState({
    x: 0,
    y: 0,
  });

  const [isZoomed, setIsZoomed] = useState(false);

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  // console.log(params);

  const fetchProductDetail = async () => {
    const response = await fetch(SummarApi.productDetails.url, {
      method: SummarApi.productDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };

  console.log(data, "product-detail page");

  useEffect(() => {
    fetchProductDetail();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = (e) => {
    setIsZoomed(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    console.log("coordinate", left, top, width, height);

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImage({
      x,
      y,
    });
  };

  const handleZoomOut = () => {
    setIsZoomed(false);
  };

  //add to cart
  const { fetchUserAddToCart } = useContext(Context);
  const handleAddToCart=async(e,id)=>{
    await addToCart(e,id);
    fetchUserAddToCart();
  }

  //buy btn
  const navigate=useNavigate()
   const handleBuyProduct=async(e,id)=>{
    await addToCart(e,id);
    fetchUserAddToCart();
    {
      user?._id ? (
        navigate('/cart')
      ): (
        toast.error("Please Login First")
      )
    }

    
  }

  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col  lg:flex-row gap-4">
        {/* Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleZoomOut}
            />

            {/* Product Image Zoom feature */}
            {isZoomed && (
              <div className="hidden lg:block absolute top-0 -right-[410px] min-w-[400px] min-h-[400px] overflow-hidden p-1 bg-slate-200">
                <div
                  className="w-full h-full min-w-[400px] min-h-[400px] scale-125 "
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImage.x * 100}% ${
                      zoomImage.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="w-20 h-20 bg-slate-200 rounded animate-pulse"
                      key={el + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imageURL, index) => {
                  return (
                    <div
                      className="w-20 h-20 bg-slate-200 rounded p-1"
                      key={imageURL + index}
                    >
                      <img
                        src={imageURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imageURL)}
                        onClick={() => handleMouseEnterProduct(imageURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* Product Detail */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full"></h2>
            <p className=" capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full"></p>

            <div className="text-red-600 flex items-center gap-1 mt-2 bg-slate-200 animate-pulse h-6 lg:h-8  w-full"></div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-2">
              <p className="text-red-600 h-6 lg:h-8 bg-slate-200 animate-pulse w-full"></p>
              <p className="text-slate-400 line-through h-6 lg:h-8 bg-slate-200 animate-pulse w-full"></p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
              <button className=" h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 animate-pulse w-full"></p>
              <p className="h-10 lg:h-12 bg-slate-200 animate-pulse w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium ">
              {data?.productName}
            </h2>
            <p className=" capitalize text-slate-400">{data?.category}</p>

            <div className="text-red-600 flex items-center gap-1 mt-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-2">
              <p className="text-red-600">
                {displayNepCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayNepCurrency(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className=" border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white transition-all" onClick={(e)=>handleBuyProduct(e,data?._id)}>
                Buy
              </button>
              <button className=" border-2 border-red-600 rounded px-3 py-1 min-w-[120px] hover:text-red-600 hover:bg-white font-medium bg-red-600 text-white transition-all" onClick={(e)=>handleAddToCart(e,data?._id)}>
                Add To Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description:</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <RecommendedProduct category={data.category} heading={"Recommended"} />
      )}
    </div>
  );
};

export default ProductDetail;
