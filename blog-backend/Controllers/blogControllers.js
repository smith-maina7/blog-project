const Blog = require("../Models/blog");

const blog_index = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "route error" });
  }
};

const blog_post_details = async (req, res) => {
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
    res.status(500).json({ message: "route error" });
  }
};

const blog_post = async (req, res) => {
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
};

const blog_delete = async (req, res) => {
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
};

module.exports = {
  blog_index,
  blog_post_details,
  blog_post,
  blog_delete,
};
