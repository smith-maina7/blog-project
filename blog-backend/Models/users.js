const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"], // Adding error that will be displayed when required is false.
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email address"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password must be at least 6 characters long"],
    minlength: 6,
  },
});

userSchema.pre("save", async function (next) {
  // not using arrow functions so that we can have access to "this" which refers to the users information.
  const salt = await bcrypt.genSalt(); // generate salt for the password.
  this.password = await bcrypt.hash(this.password, salt); // generate a hash for the password. takes 2 arg one the password and the salt.
  next(); // calling the next method so that the app doesn't hang.
});

const user = mongoose.model("User", userSchema);

module.exports = user;
