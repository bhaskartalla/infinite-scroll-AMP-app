const express = require("express")
const app = express()
app.use(express.static("public"))

const hbs = require("express-handlebars")({
  defaultLayout: "main",
  extname: ".html",
  helpers: {
    static(path) {
      return path
    },
  },
})

app.engine("html", hbs)
app.set("view engine", "html")

app.locals.test = "LOCAL"

app.use((req, res, next) => {
  res.locals.test = "LOCAL"
  res.locals.prod = process.env.NODE_ENV === "production"
  next()
})

app.get("/", (request, response) => {
  response.render("index")
})

app.get("/article1", (request, response) => {
  response.render("article1")
})

app.get("/article2", (request, response) => {
  response.render("article2")
})

app.get("/article3", (request, response) => {
  response.render("article3")
})

// console.log(process.env);

const PORT = process.env.PORT || 5000

let listener = app.listen(PORT, () => {
  console.log("Your app is listening on port " + listener.address().port)
})
