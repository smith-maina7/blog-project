const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./Models/blog");
const cors = require("cors"); //to make it possible to share between different domains(localhost)

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

//! setting up blog routes
server.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

server.get("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;

  try {
    // Use Mongoose to find the blog by its ID
    const blog = await Blog.findById(blogId);

    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // If the blog exists, send it as JSON response
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//post request
server.post("/newblogs", async (req, res) => {
  try {
    // const { title, snippet, body } = req.body; // req.body possible to the urlencoded middleware.
    // setting up a new blogSchema for new blog requests
    const newBlog = new Blog(req.body);

    //saving the new blog to the database
    await newBlog.save();

    // redireting the user to the home page afte the new blog has been created and saved.
    await res.json({ redirect: "/blogs" });
  } catch (err) {
    console.log(err);
  }
});

// delete the blog
server.delete("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;

  try {
    // Use Mongoose to find and delete the blog post by ID
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
