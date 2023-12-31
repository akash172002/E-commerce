const express = require("express");
const app = express();
const cookiePasrser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

const errorMiddleWare = require("./middleware/error");
dotenv.config({ path: "backened/config/config.env" });

app.use(express.json());
app.use(cookiePasrser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use(express.static(path.join(__dirname, "../frontened/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontened/build/index.html"));
});

//MiddleWare for Error
app.use(errorMiddleWare);

module.exports = app;
