const express = require("express");

const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const server = express();
server.use(express.json({}));
server.use(
  express.json({
    extended: true,
  })
);
dotenv.config({ path: `./config/config.env` });
const PORT = process.env.PORT || 3000;
connectDB();

server.use("/api/barapp/staff", require("./routes/category"));
server.use("/api/barapp/staff", require("./routes/item"));
// server.use("/api/todo", require("./routes/todo"));
server.use("/uploads", express.static("uploads"));






server.listen(PORT, (req, res) => {
  console.log(`Server is running on port: ${PORT}`);
});
