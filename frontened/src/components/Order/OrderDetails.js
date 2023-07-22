import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAlert } from "react-alert";

const OrderDetails = () => {
  const alert = useAlert();
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, alert]);

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();

    const orderDetailPage = document.querySelector(".orderDetailPage");

    const options = {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      width: orderDetailPage.offsetWidth,
      height: orderDetailPage.offsetHeight,
    };

    const canvas = await html2canvas(orderDetailPage, options);
    const imageData = canvas.toDataURL("image/jpeg", 1.0);

    const pdfWidth = doc.internal.pageSize.getWidth();

    const imageProps = doc.getImageProperties(imageData);
    const pdfImageHeight = (imageProps.height * pdfWidth) / imageProps.width;

    doc.addImage(imageData, "JPEG", 0, 0, pdfWidth, pdfImageHeight);
    doc.save("order_details.pdf");
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Detail" />
          <div className="orderDetailPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info: </Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name: </p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone: </p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address: </p>
                  <span>
                    {order && order.shippingInfo && order.shippingInfo.address}
                    {order && order.shippingInfo && order.shippingInfo.city},
                    {order && order.shippingInfo && order.shippingInfo.state},{" "}
                    {order && order.shippingInfo && order.shippingInfo.pincode},
                    {order && order.shippingInfo && order.shippingInfo.country};
                  </span>
                </div>
              </div>

              <Typography>Payment: </Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order &&
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order &&
                    order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount: </p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status: </Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
              <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        {""}
                        <span>
                          {item.quantity} X {item.price} = {""}{" "}
                          <b>{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <Button variant="contained" onClick={handleDownloadPDF}>
            Download PDF
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
