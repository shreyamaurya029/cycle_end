import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;


function Add() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [booking, setBooking] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("startDate", startDate);
      productData.append("endDate", endDate);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="container-fluid m-3 p-3">
        <h1>Sell /Rent Vehicle</h1>
        <div className="m-1 w-75">
          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setCategory(value);
            }}
          >
            {categories?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className="mb-3">
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              placeholder="write a name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              value={description}
              placeholder="write a description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
            
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={price}
              placeholder="write a Price"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={quantity}
              placeholder="write a quantity"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Select
              bordered={false}
              placeholder="Select Booking "
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setBooking(value);
              }}
            >
              <Option value="0">Sell</Option>
              <Option value="1">Rent</Option>
            </Select>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleCreate}>
              ADD PRODUCT
            </button>
          </div>
        </div>
      </div>
        
  );
}

export default Add;
