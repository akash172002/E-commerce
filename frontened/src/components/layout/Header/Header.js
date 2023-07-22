import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { FaUserAlt } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

const Header = () => {
  return (
    <ReactNavbar
      burgerColor="#91a7ff"
      burgerColorHover="#91a7ff"
      navColor1="white"
      logo={logo}
      logoWidth="20vmax"
      logoHoverSize="10px"
      logoHoverColor="#ed4034"
      link1Text="Home"
      link2Text="Product"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="rgba(35,35,35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link2ColorHover="#eb4034"
      link3ColorHover="#eb4034"
      link4ColorHover="#eb4034"
      link2Margin="2vmax"
      link3Margin="0"
      link4Margin="1vmax"
      profileIconColor="rgba(35,35,35,0.8)"
      searchIconColor="rgba(35,35,35,0.8)"
      cartIconColor="rgba(35,35,35,0.8)"
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
      cartIconMargin="1vmax"
      profileIcon={true}
      cartIcon={true}
      searchIcon={true}
      CartIconElement={BsCart3}
      ProfileIconElement={FaUserAlt}
      SearchIconElement={BsSearch}
      logoAnimationTime="0.7"
      link1AnimationTime="0.1"
      link2AnimationTime="0.1"
      profileIconAnimationTime="0.4"
      cartIconAnimationTime="0.4"
      searchIconAnimationTime="0.4"
      profileIconUrl="/login"
    />
  );
};

export default Header;
