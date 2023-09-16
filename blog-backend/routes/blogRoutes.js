const express = require("express");
const route = express.Router();
const blogControllers = require("../Controllers/blogControllers");
const { requireAuth } = require("../Middleware/authMiddleware");

route.get("/blogs", blogControllers.blog_index);

route.get("/blogs/:id", blogControllers.blog_post_details);

//post request
route.post("/newblogs", requireAuth, blogControllers.blog_post);

// delete the blog
route.delete("/blogs/:id", requireAuth, blogControllers.blog_delete);

module.exports = route;
