import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";
import MetaData from "../layout/MetaData";

const categories = [
  "laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "Iphone",
];

const Products = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setCurrentPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    loading,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setCurrentPrice(newPrice);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`PRODUCTS -- ECOMMERCE`} />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} products={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={250000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => {
                return (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                );
              })}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
