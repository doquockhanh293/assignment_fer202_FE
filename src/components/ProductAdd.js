//productapp

import React, { useState } from "react";

const ProductAdd = () => {
  const [newProduct, setNewProduct] = useState({
    id: "", // Bắt đầu từ ID 1
    name: "",
    description: "",
    price: "",
    currentPrice: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Biến trạng thái để theo dõi ID cuối cùng

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://assignment-fer202.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const data = await response.json();
      console.log("Product added:", data);
      setSuccess(true);

      // Cập nhật ID cho sản phẩm tiếp theo

      setNewProduct({
        id: "", // Cập nhật ID mới
        name: "",
        description: "",
        price: "",
        currentPrice: "",
        image: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4" style={{ color: "orange" }}>
        Add Products
      </h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {success && <p style={{ color: "green" }}>Product added successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">Product id</label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            value={newProduct.id} // Hiển thị ID hiện tại
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentPrice">Current Price</label>
          <input
            type="text"
            className="form-control"
            id="currentPrice"
            name="currentPrice"
            value={newProduct.currentPrice}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
