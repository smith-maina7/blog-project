const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors"); //to make it possible to share between different domains(localhost)
const cookieParser = require("cookie-parser");

const server = express();
server.use(cors());
const dbURI =
  "mongodb+srv://smithmaina7:K3nnah820@backend-tuts.qhw9np2.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("successfully connected to MongoDB");
    server.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });

//! middleware for the server
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true })); // middleware for so that the new data from the form can accepted as body to the server extended is optional.
server.use(express.json());
server.use(cookieParser());

//! setting up blog routes
server.use(blogRoutes);
server.use(userRoutes);

//todo: set up mvc and express router
//TODO: setting up dummy routes for working with cookies.

// server.get("/set-cookies", (req, res) => {
//   res.setHeader("set-cookie", "newUser = true");
//   res.send("you created a new cookie");
// });
// server.get("/readcookies", (req, res) => {});
