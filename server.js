import express from "express"
import next from "next"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import Auth from "./tools/Auth"

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    // Request body parsing middleware should be above methodOverride
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(cookieParser())

    server.post("/register", (req, res) => {
      res.status(200).json({
        data: "alo",
      })
    })
    // Verify username and password, if passed, we return jwt token for client
    // We also include xsrfToken for client, which will be used to prevent CSRF attack
    // and, you should use random complicated key (JWT Secret) to make brute forcing token very hard
    server.post("/authenticate", (req, res) => {
      let { username, password } = req.body
      // if logged in
      if (username === "test" || password === "test") {
        // create token
        const token = jwt.sign({
          username,
          xsrfToken: crypto.createHash("md5").update(username).digest("hex"),
        }, "jwtSecret", {
          expiresIn: 60 * 60 * 24 * 30, // 30days
        })
        res.status(200).json({
          success: true,
          message: "Enjoy your token",
          token,
        })
      } else {
        res.status(400).json({
          success: false,
          message: "Authentication failed",
        })
      }
    })

    // Api example to prevent CRSF attack
    server.post("/api/preventCRSF", (req, res, next) => {
      if (req.decoded.xsrfToken === req.get("X-XSRF-TOKEN")) {
        res.status(200).json({
          success: true,
          message: "Yes, this api is protected by CRSF attack",
        })
      } else {
        res.status(400).json({
          success: false,
          message: "CRSF attack is useless",
        })
      }
    })

    server.get("*", (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log("> Ready on http://vbo.local")
    })
  })
