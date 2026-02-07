const router = require("express").Router();
const { Meal } = require("../models");
const apiRoutes = require("./api");


router.get("/", async (req, res) => {
  try {
    const mealData = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a");
    const mealsObject = await mealData.json();
    const mealList = mealsObject.meals;

    res.render("home", {
      mealList: mealList
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
