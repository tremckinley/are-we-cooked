const router = require("express").Router();
//const { savedMeal } = require("../../models");

// TODO: Get 20 meals
router.get("/", async (req, res) => {
  try {
    const mealData = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
    const mealsObject = await mealData.json();
    const meals = mealsObject.meals;
    console.log(meals);
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
