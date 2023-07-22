import React from "react";
import "./aboutSection.css";
import Logo from "../../Logo.png";
import { Avatar, Typography } from "@mui/material";

const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={Logo}
              alt="Founder"
            />
            <Typography>Team Rogx</Typography>

            <span>
              This is a sample wesbite which is made up on a MERN STACK And This
              Project is done by Team Rogx members are Akash Chandra Sarraf,
              Krupesh Prajapati, Kuldeep Singh Student of Parul Institute of
              Computer Application , Vadodara , Gujrat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
