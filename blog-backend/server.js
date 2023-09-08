const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const cors = require("cors"); //to make it possible to share between different domains(localhost)
const PORT = process.env.PORT || 3000;

const server = express();
server.use(cors());
const blogDbURI =
  "mongodb+srv://smithmaina7:K3nnah820@backend-tuts.qhw9np2.mongodb.net/?retryWrites=true&w=majority";
const userDbURI =
  "mongodb+srv://smithmaina:K3nnah820@cluster0.t4kmrqd.mongodb.net/?retryWrites=true&w=majority";

const blogDB = mongoose.createConnection(blogDbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
console.log("blogDB connection instance created successfully");
const userDB = mongoose.createConnection(userDbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
blogDB.once("open", () => {
  console.log("blogDB connection established successfully");
});

blogDB.on("error", (error) => {
  console.log("blogDB connection error:", error);
});

userDB.once("open", () => {
  console.log("userDB connection established successfully");
});

userDB.on("error", (error) => {
  console.log("userDB connection error:", error);
});

module.exports = { blogDB, userDB };
//! middleware for the server
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true })); // middleware for so that the new data from the form can accepted as body to the server extended is optional.
server.use(express.json());

//! setting up blog routes
server.use(blogRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
