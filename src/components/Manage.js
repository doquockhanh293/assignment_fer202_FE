//manage

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../ProductList.css";
import { Link } from "react-router-dom";

const Manage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://assignment-fer202.onrender.com/api/products"
      );
      if (!response.ok) {
        throw new Error("Unable to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://assignment-fer202.onrender.com/api/products/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        // Filter out the deleted product from the state
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="my-4" style={{ color: "orange" }}>
        Manage Products
      </h2>
      {error && <p>Error: {error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th style={{ whiteSpace: "nowrap" }}>Current Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.currentPrice}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  style={{ minWidth: "100px" }} // Đặt chiều rộng tối thiểu
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-primary btn-sm"
                  style={{ minWidth: "100px" }} // Đặt chiều rộng tối thiểu
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Manage;
