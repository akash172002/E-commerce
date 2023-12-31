import React from "react";
import ReactStar from "react-rating-stars-component";
import profilePng from "../../images/profile.jpg";
import "./ProductDetail.css";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="use" />
      <p>{review.name}</p>
      <ReactStar {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
