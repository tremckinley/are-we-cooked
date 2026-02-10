const router = require("express").Router();
const { Meal } = require("../models");
const apiRoutes = require("./api");
const {
  //getMealbyFirstLetter,
  getRandomMeal,
  configureMealDBData,
} = require("../utils/mealdb-helpers");

router.get("/", async (req, res) => {
  try {
    const favoriteMealsRaw = await Meal.findAll({
      where: {
        favorite: true,
      },
    });

    const thisWeekMealsRaw = await Meal.findAll({
      where: {
        thisweek: true,
      },
    });

    const favoriteMeals = favoriteMealsRaw.map((meal) =>
      meal.get({ plain: true }),
    );
    const thisWeekMeals = thisWeekMealsRaw.map((meal) =>
      meal.get({ plain: true }),
    );

    res.render("home", {
      favoriteMeals,
      thisWeekMeals,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/random", async (req, res) => {
  try {
    const rawMeal = await getRandomMeal();
    const configuredMeal = configureMealDBData(rawMeal);
    res.render("meal", {
      mealData: configuredMeal,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/meal/:id", async (req, res) => {
  try {
    const selectedMealRaw = await Meal.findByPk(req.params.id);
    const selectedMeal = selectedMealRaw.get({ plain: true });
    if (!selectedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.render("meal", {
      mealData: selectedMeal,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/savedMeals", async (req, res) => {
  try {
    const myMealsRaw = await Meal.findAll();
    const myMeals = myMealsRaw.map((meal) => meal.get({ plain: true }));

    res.render("savedMeals", {
      myMeals: myMeals,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
