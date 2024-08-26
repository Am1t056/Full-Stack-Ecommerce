import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/banner5.jpg";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";

import image1Mobile from "../assest/banner/banner5.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const previousImage = () => {
    if (currentImage != 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(()=>{
    const interval=setInterval(()=>{
        if (desktopImages.length - 1 > currentImage) {
            nextImage()
        }else{
            setCurrentImage(0)
        }
    },5000)

    return ()=>clearInterval(interval)
  },[currentImage])
  return (
    <div className="container mx-auto px-4 rounded ">
      <div className="h-60 md:h-72 w-full bg-slate-200 relative ">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button
              onClick={previousImage}
              className="bg-white shadow-md rounded-full p-1 mx-2"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1 mx-2"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* desktop and tablet version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((imageURL, index) => {
            return (
              <div
                className="h-full w-full min-h-full min-w-full transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} alt="" className="w-full h-full" />
              </div>
            );
          })}
        </div>
        

        {/* mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((imageURL, index) => {
            return (
              <div
                className="h-full w-full min-h-full min-w-full transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} alt="" className="w-full h-full object-cover object-center" />
              </div>
            );
          })}
        </div>


      </div>
    </div>
  );
};

export default BannerProduct;
