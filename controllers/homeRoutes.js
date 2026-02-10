const router = require("express").Router();
const { Meal } = require("../models");
const apiRoutes = require("./api");
const { getMealbyFirstLetter } = require("../utils/mealdb-helpers");



router.get("/", async (req, res) => {
  try {
    const favoriteMealsRaw = await Meal.findAll({
      where: {
        favorite: true
      }
    });

    const thisWeekMealsRaw = await Meal.findAll({
      where: {
        thisweek: true
      }
    });

    const favoriteMeals = favoriteMealsRaw.map((meal) => meal.get({ plain: true }));
    const thisWeekMeals = thisWeekMealsRaw.map((meal) => meal.get({ plain: true }));

    res.render("home", {
      favoriteMeals,
      thisWeekMeals
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
