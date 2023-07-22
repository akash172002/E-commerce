import { Typography } from "@mui/material";
import "./OrderSuccess.css";
import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  return (
    <div>
      <MetaData title="Success" />
      <div className="orderSuccess">
        <BsCheck2Circle />
        <Typography>Your Order has been Placed Successfully</Typography>
        <Link to="/orders">View Order</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
