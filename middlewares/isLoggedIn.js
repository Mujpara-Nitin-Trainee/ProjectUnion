const jwt = require("jsonwebtoken");

const secret_key = process.env.SECRET_KEY;

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        return next();
      }

      return res.redirect("/api/user/home");
    });
  } else {
    return next();
  }
};

module.exports = isLoggedIn;
