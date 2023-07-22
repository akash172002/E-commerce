import React from "react";
import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
import { Rating } from "@mui/material";

const ProductCard = ({ products }) => {
  const options = {
    value: products.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${products._id}`}>
      {products.images && products.images[0] && (
        <img src={products.images[0].url} alt="product" />
      )}
      <p>{products.name}</p>
      <div>
        <Rating {...options} /> <span>{products.numOfReviews} reviews</span>
      </div>
      <span>{`₹${products.price}`}</span>
    </Link>
  );
};

export default ProductCard;
