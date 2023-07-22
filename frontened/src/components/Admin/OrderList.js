import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";

import "./ProductList.css";
import { useNavigate } from "react-router-dom";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import { allOrders, clearErrors, deleteOrder } from "../../actions/orderAction";
import { useAlert } from "react-alert";

const OrderList = () => {
  const alert = useAlert();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted, error: deleteError } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Has been deleted Successfully");
      history("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(allOrders());
  }, [error, dispatch, deleteError, isDeleted, history, alert]);

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
      headerName: "Action",
      type: "number",
      minwidth: 350,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteOrderHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems[0].quantity,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title="All ORDERS -- Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 className="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
