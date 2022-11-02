"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import dotenv from "dotenv";

// Database connection
// import ConnectDB from "./database/connection";

// dotenv.config();

const zomato = (0, _express.default)();
zomato.use(_express.default.json());
zomato.get("/", (req, res) => {
  res.json({
    message: "Server is running"
  });
});
const PORT = 4000;
zomato.listen(PORT, () => {
  // ConnectDB()
  //   .then(() => {
  //     console.log("Server is running !!!");
  //   })
  //   .catch((error) => {
  //     console.log("Server is running, but database connection failed...");
  //     console.log(error);
  //   });

  console.log("Server is running !!!");
});