import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import "./CheckoutStep.css";
import { MdPayment } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Detail</Typography>,
      icon: <FaShippingFast />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <BsFillCartCheckFill />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <MdPayment />,
    },
  ];

  const stepStyle = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
