const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

//Handle uncought Exception
process.on("uncaughtException", (err) => {
  console.log(`"Errror : ${err.message}`);
  console.log("Shutting down the server due to Uncought Exception");
  process.exit(1);
});

//config
dotenv.config({ path: "backened/config/config.env" });

//Connecting to database
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandeleed promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
