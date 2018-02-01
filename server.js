import express from "express"
import next from "next"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import lusca from "lusca"
import moment from "moment"
import helmet from "helmet"
import Auth from "./tools/Auth"
import routes from "./server/routes"

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    // Request body parsing middleware should be above methodOverride
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({
      extended: true,
      limit: "50mb",
      parameterLimit: 10000000, // experiment with this parameter and tweak
    }))
    server.use(cookieParser())
    server.use(lusca.xframe("SAMEORIGIN"))
    server.use(lusca.xssProtection(true))
    // global user info
    server.use(helmet())
    server.use(helmet.xssFilter()) // sets the X-XSS-Protection header
    server.use(helmet.frameguard("deny")) // Prevent iframe clickjacking
    server.use(lusca.nosniff())
    server.locals.moment = moment

    server.use((req, res, next) => {
      res.locals.user = req.user
      next()
      // res.setHeader("X-Powered-By", "Nhan Co") // modify X power header
      // res.setHeader("X-Dev-By", "http://fb.com/nhanco") // modify X power header
    })
    routes(server, handle)

    server.listen(port, (err) => {
      if (err) throw err
      console.log("> Ready on http://vbo.local")
    })
  })
