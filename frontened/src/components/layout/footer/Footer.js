import React from "react";
import playStore from "../../../images/playStore.png";
import appleStore from "../../../images/appleStore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftfooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appleStore} alt="applestore" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>
          Copyright {new Date().getUTCFullYear()} &copy; Krupesh, Kuldeep, Akash
        </p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="/">Instagram</a>
        <a href="/">facebook</a>
        <a href="/">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
