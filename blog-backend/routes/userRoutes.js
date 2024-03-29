const express = require("express");
const route = express.Router();
const userControllers = require("../Controllers/userController");

route.get("/users", userControllers.user_index);
route.post("/register", userControllers.signup_user);
route.post("/login", userControllers.login_user);

// route.get("/blogs/:id", blogControllers.blog_post_details);

// //post request
// route.post("/newblogs", blogControllers.blog_post);

// // delete the blog
// route.delete("/blogs/:id", blogControllers.blog_delete);

module.exports = route;
