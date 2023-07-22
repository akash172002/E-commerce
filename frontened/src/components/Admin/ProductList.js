import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";
import { useAlert } from "react-alert";

const ProductList = () => {
  const alert = useAlert();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);
  const { isDeleted, error: deletedError } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deletedError) {
      alert.error(deletedError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Has been deleted Successfully");
      history("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [error, dispatch, deletedError, isDeleted, history, alert]);

  const columns = [
    { field: "id", headerName: "Product Id", minwidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minwidth: 350, flex: 0.5 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minwidth: 350,
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minwidth: 350,
      flex: 0.5,
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
            <Link to={`/admin/products/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title="All Product -- Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 className="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
