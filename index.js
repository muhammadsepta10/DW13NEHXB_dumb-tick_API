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
const userContr = require("./controllers/user");
const orderContr = require("./controllers/order");
const favoriteContr = require("./controllers/favorite");
const { authenticated } = require("./middleware");

app.group("/api/categories", router => {
  router.get("/", categoriesContr.index);
  router.get("/category/:id", categoriesContr.show);
});

app.group("/api/events", router => {
  router.get("/", eventsContr.index);
  router.get("/search/:name", eventsContr.search);
  router.get("/sortBy/:date", eventsContr.sortBy);
  router.get("/category/:id", eventsContr.byCategory);
  router.post("/input", authenticated, eventsContr.input);
  router.get("/event/:id", eventsContr.show);
});

app.group("/api/auth", router => {
  router.post("/login", authContr.login);
  router.post("/register", authContr.register);
});

app.group("/api/user", router => {
  router.get("/:id", authenticated, userContr.show);
  router.put("/edit/:id", authenticated, userContr.edit);
});

app.group("/api/order", router => {
  router.get("/", orderContr.index);
  router.get("/payment/:id", orderContr.showApplymen);
  router.post("/pending", authenticated, orderContr.pending);
  router.put("/confirm/:id", authenticated, orderContr.confirmed);
  router.put("/approved/:id", authenticated, orderContr.approved);
  router.get("/show_approved/:id", orderContr.showApprove);
});

app.group("/api/favorites", router => {
  router.get("/", favoriteContr.index);
  router.get("/user/:id", favoriteContr.showByUser);
  router.post("/like", favoriteContr.like);
  router.delete("/dislike/:id", favoriteContr.disLike);
});

app.listen(port);
