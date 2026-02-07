const router = require("express").Router();
const { Meal } = require("../models");
const apiRoutes = require("./api");


router.get("/", async (req, res) => {
  try {
    const mealList = apiRoutes.get("/meals");
    res.render("home", {
      mealList: mealList
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
