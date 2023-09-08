const User = require("../Models/users");

const user_index = async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "route error" });
  }
};

module.exports = {
    user_index
}