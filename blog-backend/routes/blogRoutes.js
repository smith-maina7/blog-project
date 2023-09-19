const express = require("express");
const route = express.Router();
const blogControllers = require("../Controllers/blogControllers");
const { authenticating } = require("../Middleware/authMiddleware");

route.get("/blogs", blogControllers.blog_index);

route.get("/blogs/:id", blogControllers.blog_post_details);

//post request
route.post("/newblogs", authenticating, blogControllers.blog_post);

// delete the blog
route.delete("/blogs/:id", authenticating, blogControllers.blog_delete);

module.exports = route;
