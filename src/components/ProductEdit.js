import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    currentPrice: "",
    image: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://assignment-fer202.onrender.com/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Unable to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://assignment-fer202.onrender.com/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      // Chuyển hướng người dùng trở lại trang chi tiết sản phẩm đã được cập nhật
      window.location.href = `/products/${id}`;
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h2>Edit Product</h2>
      <div className="form-group">
        <label htmlFor="id">id:</label>
        <input
          type="text"
          className="form-control"
          id="id"
          name="id"
          value={product.id} // Hiển thị ID hiện tại
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          className="form-control"
          id="price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="currentPrice">Current Price:</label>
        <input
          type="text"
          className="form-control"
          id="currentPrice"
          name="currentPrice"
          value={product.currentPrice}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">image</label>
        <input
          type="text"
          className="form-control"
          id="image"
          name="image"
          value={product.image}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
      <Link to={`/products/${id}`} className="btn btn-secondary ml-2">
        Cancel
      </Link>
    </div>
  );
};

export default ProductEdit;
