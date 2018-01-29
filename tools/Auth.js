import jwt from "jsonwebtoken"
// login checking
exports.LoginCheck = (req, res, next) => {
  const token = req.cookies["x-access-token"]
  if (token) {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.redirect("/login")
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    res.redirect("/login")
  }
}
