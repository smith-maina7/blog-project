const User = require("../Models/users");
const jwt = require("jsonwebtoken");
const maxAge = 60 * 60 * 24;

//!handle errors function
const handleError = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //duplicate email addresses errors
  if (err.code === 11000) {
    errors.email = "The email address has already been registered";
    return errors;
  }
  // validation erros
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      // got the properties from disctructurinng error object we get in the console.
      errors[properties.path] = properties.message;
    });
  }
  // login Password error messages
  if (err.message === "invalid password") {
    errors.password = "incorrect password, please check your password";
  }

  // Login Email error messages
  if (err.message === "incorrect email address") {
    errors.email = "incorrect email address, please check your email";
  }
  return errors;
};

//! jwt token creation function
const createToken = (id) => {
  return jwt.sign({ id }, "smith blog secret security token", {
    expiresIn: maxAge,
  });
};
const user_index = async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "route error" });
  }
};
const signup_user = async (req, res) => {
  //todo: 1st method to create and save user to the database
  // try {
  //   const newUser = new User(req.body);
  //   await newUser.save();
  //   res.json(newUser);
  // } catch (err) {
  //   console.log(err);
  // }
  //todo: 2nd way to create and save a new user to the database
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    const token = createToken(newUser._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      domain: "localhost",
    });
    res.json(newUser._id);
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};
const login_user = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      domain: "localhost",
    });
    res.status(200).json(user._id);
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};
module.exports = {
  user_index,
  signup_user,
  login_user,
};
