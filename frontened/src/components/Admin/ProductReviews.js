import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import {
  getAllReviews,
  deleteReviews,
  clearErrors,
} from "../../actions/productAction";
import "./ProductReviews.css";
import { useNavigate } from "react-router-dom";
import { DELETE_REVIEW_RESET } from "../../constants/productConstant";
import { useAlert } from "react-alert";

const ProductReviews = () => {
  const alert = useAlert();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const { isDeleted, error: deletedError } = useSelector(
    (state) => state.review
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deletedError) {
      alert.error(deletedError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review deleted Successfully");
      history("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
    dispatch(getAllReviews);
  }, [error, dispatch, deletedError, isDeleted, history, productId, alert]);

  const columns = [
    { field: "id", headerName: "Review Id", minwidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",

      minwidth: 200,
      flex: 0.3,
    },
    { field: "comment", headerName: "Comment", minwidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minwidth: 180,
      flex: 0.5,
      cellClassName: (params) => {
        const rating = params.value;
        return rating >= 3 ? "greenColor" : "redColor";
      },
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
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title="All Reviews -- Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="reviewListContainer">
          <form
            className="createReviewForm"
            onSubmit={productReviewSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">All REVIEWS</h1>

            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Product Id"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableRowSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
