import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { FiExternalLink } from "react-icons/fi";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

const MyOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.myOrders);
  const { user, loading } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "order ID",
      minwidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minwidth: 300,
      flex: 0.5,
      cellClassName: (params) => {
        const status = params.value;
        return status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minwidth: 300,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minwidth: 300,
    },
    {
      field: "action",
      flex: 0.3,
      headerName: "Actions",
      minwidth: 150,
      type: "number",
      sortable: false,

      renderCell: (params) => {
        return (
          <Link to={`/orders/${params.row.id}`}>
            <FiExternalLink />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems[0].quantity,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Order`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
