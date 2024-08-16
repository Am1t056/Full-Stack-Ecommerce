import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummarApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose,fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    console.log(file, "file");

    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
    console.log(uploadImageCloudinary.url, "uploadImageCloudinary");
  };

  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const handleDeleteProductImage = async (index) => {
    console.log("Image Index", index);
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  {
    /*Upload product button */
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummarApi.uploadProduct.url, {
      method: SummarApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi?.message);
      onClose();
    }
    fetchData()
    if (dataApi.error) {
      toast.error(dataApi?.message);
    }
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter the Product Name"
            value={data.productName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded-md"
            required
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name:
          </label>
          <input
            type="text"
            id="productName"
            placeholder="Enter the Brand Name"
            name="brandName"
            value={data.brandName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded-md"
            required
          />

          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            value={data.category}
            name="category"
            className="p-2 bg-slate-100 border rounded-md"
            onChange={handleChange}
            required
          >
            <option value={" "}>Select Category</option>
            {productCategory.map((a, index) => (
              <option value={a.value} key={a.value + index}>
                {a.label}
              </option>
            ))}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image:
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded-md h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  name="productImage"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((a, index) => {
                  return (
                    <div className="relative group" key={a}>
                      <img
                        src={a}
                        alt={a}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(a);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload product image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price:
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter the Price"
            value={data.price}
            name="price"
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded-md"
            required
          />

          <label htmlFor="sellinPrice" className="mt-3">
            Selling Price:
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter the selling Price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded-md"
            required
          />

          <label htmlFor="description" className="mt-3">
            Description:
          </label>
          <textarea
            rows={3}
            onChange={handleChange}
            name="description"
            value={data.description}
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter product Description"
          ></textarea>

          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Upload Product
          </button>
        </form>
      </div>

      {/* display image in full screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
