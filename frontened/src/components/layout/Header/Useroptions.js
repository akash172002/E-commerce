import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { MdDashboard } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import { FaListAlt } from "react-icons/fa";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { MdShoppingCart } from "react-icons/md";

import { Backdrop } from "@mui/material";

const Useroptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const options = [
    {
      icon: <FaListAlt />,
      name: "Orders",
      func: orders,
    },
    { icon: <BsFillPersonFill />, name: "Profile", func: account },
    {
      icon: (
        <MdShoppingCart
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <BiExit />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history("/admin/dashboard");
  }

  function orders() {
    history("/orders");
  }
  function account() {
    history("/account");
  }
  function logoutUser() {
    dispatch(logout());
    alert("Logout Successfully");
  }

  function cart() {
    history("/cart");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default Useroptions;
