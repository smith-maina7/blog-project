const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  // checking if json web token exists and if it is valid
  if (token) {
    jwt.verify(
      token,
      "smith blog secret security token",
      (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          return res.status(401).json({ authenticated: false });
        } else {
          console.log(decodedToken);
          res.user = decodedToken;
          next();
        }
      }
    );
  } else {
    res.redirect("/login");
  }
};

module.exports = { requireAuth };
