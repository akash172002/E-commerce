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

import { clearErrors, deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstans";
import { useAlert } from "react-alert";

const UsersList = () => {
  const alert = useAlert();
  const history = useNavigate();
  const dispatch = useDispatch();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    isDeleted,
    error: deletedError,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert.success(message);
      history("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [error, dispatch, deletedError, isDeleted, history, message, alert]);

  const columns = [
    { field: "id", headerName: "User Id", minwidth: 180, flex: 0.8 },
    { field: "email", headerName: "Email", minwidth: 200, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minwidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minwidth: 150,
      flex: 0.3,
      type: "number",
      cellClassName: (params) => {
        const role = params.value;
        return role === "admin" ? "greenColor" : "redColor";
      },
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minwidth: 150,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteUserHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title="All USERS -- Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 className="productListHeading">ALL USERS</h1>

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

export default UsersList;
