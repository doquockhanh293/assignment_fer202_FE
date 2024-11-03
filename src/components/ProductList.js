import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../ProductList.css";
import { Link } from "react-router-dom";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Lọc sản phẩm dựa trên searchQuery
    if (searchQuery) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

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
      setFilteredProducts(data); // Cập nhật filteredProducts khi fetch thành công
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container-fluid black-background">
      <h2 className="my-4" style={{ color: "orange" }}>
        Product List
      </h2>
      {error && <p>Error: {error}</p>}
      <div className="row mt-4">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="col-md-3 mb-4"
              style={{ background: "red" }}
            >
              <Link
                to={`/products/${product.id}`} // Sửa lỗi ở đây
                className="text-decoration-none text-dark"
              >
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top align-self-center mt-auto"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">Price: {product.price}</p>
                    <p className="card-text">
                      Current Price: {product.currentPrice}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
