const express = require("express");
const bodyParser = require("body-parser");
require("express-group-routes");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Header", "*");
  // res.header("Access-Control-Allow-Method");
  next();
});

// categories controller
const categoriesContr = require("./controllers/category");
const eventsContr = require("./controllers/events");
const authContr = require("./controllers/auth");
const { authenticated } = require("./middleware");

app.group("/api/categories", router => {
  router.get("/", categoriesContr.index);
  router.get("/category/:id", categoriesContr.show);
});

app.group("/api/events", router => {
  router.get("/", eventsContr.index);
  router.get("/search", eventsContr.search);
  router.get("/category/:id", eventsContr.byCategory);
  router.post("/input", eventsContr.input);
  router.get("/event/:id", eventsContr.showq);
});

app.group("/api/auth", router => {
  router.post("/login", authContr.login);
  router.post("/register", authContr.register);
});

app.listen(port);
