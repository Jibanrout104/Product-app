import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";

import "./App.css";
Modal.setAppElement("#root");

const ProductDetailsModal = ({ isOpen, onRequestClose, product }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Product Details"
    className="modal"
    overlayClassName="modal-overlay"
  >
    {product ? (
      <>
        <h2>{product.title}</h2>
        <p>
          <strong>Price:</strong> {product.price}
        </p>
        <p>
          <strong>Popularity:</strong> {product.popularity}
        </p>
        {/* this is just for commit */}
        <p>
          <strong>Description:</strong>{" "}
          {product.description || "No description available."}
        </p>
        <button onClick={onRequestClose}>Close</button>
      </>
    ) : (
      <div>Product not found</div>
    )}
  </Modal>
);

const App = () => {
  const [products, setProducts] = useState([]); //Data fetch
  const [filteredProducts, setFilteredProducts] = useState([]); //search
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPopularity, setMinPopularity] = useState("");
  const [maxPopularity, setMaxPopularity] = useState("");
  const [sortCriteria, setSortCriteria] = useState("price"); // Default sorting criteria
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [currentPage, setCurrentPage] = useState(1); // Pagination: current page
  const [productsPerPage] = useState(20); // Pagination: products per page
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");

        const productsArray = Object.values(response.data.products);

        setProducts(productsArray);
      } catch (err) {
        console.error("Error fetching products:", err.message);
        setError("Error fetching products");
      }
    };

    fetchProducts();
  }, []);

  //Searchbar

  useEffect(() => {
    try {
      // Filter products based on the search query
      const result = products
        .filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((product) => {
          const price = parseFloat(product.price.replace("$", ""));
          const popularity = parseFloat(product.popularity);

          const priceInRange =
            (!minPrice || price >= minPrice) &&
            (!maxPrice || price <= maxPrice);

          const popularityInRange =
            (!minPopularity || popularity >= minPopularity) &&
            (!maxPopularity || popularity <= maxPopularity);

          return priceInRange && popularityInRange;
        })
        .sort((a, b) => {
          if (sortCriteria === "price") {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);
            return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
          } else if (sortCriteria === "popularity") {
            const popularityA = parseFloat(a.popularity);
            const popularityB = parseFloat(b.popularity);
            return sortOrder === "asc"
              ? popularityA - popularityB
              : popularityB - popularityA;
          }
          return 0;
        });

      setFilteredProducts(result);
    } catch (err) {
      console.error("Error filtering products:", err.message);
      setError("Error filtering products");
    }
  }, [
    searchQuery,
    products,
    minPrice,
    maxPrice,
    minPopularity,
    maxPopularity,
    sortCriteria,
    sortOrder,
  ]);

  // Pagination logic

  const getDisplayedProducts = () => {
    if (!filteredProducts || filteredProducts.length === 0) {
      return [];
    }

    if (currentPage === 1) {
      return filteredProducts; // Show all products on Page 1
    } else {
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct); // Show 20 products on Page 2
    }
  };

  const currentProducts = getDisplayedProducts();

  const totalPages =
    Math.ceil((filteredProducts.length || 0) / productsPerPage) + 1;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>

      <div className="container">
        <h1>Product List</h1>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        <div className="filters">
          <div className="filter">
            <label>Price Range:</label>
            <input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="filter">
            <label>Popularity Range:</label>
            <input
              type="number"
              placeholder="Min popularity"
              value={minPopularity}
              onChange={(e) => setMinPopularity(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max popularity"
              value={maxPopularity}
              onChange={(e) => setMaxPopularity(e.target.value)}
            />
          </div>

          <div className="filter">
            <label>Sort By:</label>
            <select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="price">Price</option>
              <option value="popularity">Popularity</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <ProductDetailsModal
            isOpen={!!selectedProduct}
            onRequestClose={handleCloseModal}
            product={selectedProduct}
          />

          <div className="pagination">
            {currentPage > 1 && <p>Below are 20 products:</p>}
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                >
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.popularity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
