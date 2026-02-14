const router = require("express").Router();
const { Meal } = require("../models");
const {
  getRandomMeal,
  configureMealDBData,
  getAllCategories,
  getAllAreas,
  getAllFirstLetters,
  getMealbyCategory,
  getMealbyFirstLetter,
  getMealbyName,
  getMealbyArea,
} = require("../utils/mealdb-helpers");

const {
  getAllSavedMeals,
  getFavoriteMeals,
  getThisWeekMeals,
  getStatusIds
} = require("../utils/awcdb-helpers");

router.get("/", async (req, res) => {
  try {
    const favoriteMealsRaw = await getFavoriteMeals();
    const thisWeekMealsRaw = await getThisWeekMeals();
    const { favoriteMealIds, thisWeekMealIds } = await getStatusIds();

    const favoriteMeals = favoriteMealsRaw.map((meal) =>
      meal.get({ plain: true }),
    );
    const thisWeekMeals = thisWeekMealsRaw.map((meal) =>
      meal.get({ plain: true }),
    );

    res.render("home", {
      favoriteMeals,
      thisWeekMeals,
      favoriteMealIds,
      thisWeekMealIds,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/random", async (req, res) => {
  try {
    const configuredMeal = await getRandomMeal();
    const { favoriteMealIds, thisWeekMealIds } = await getStatusIds();
    res.render("meal", {
      mealData: configuredMeal,
      favoriteMealIds,
      thisWeekMealIds
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/meal/:idmeal", async (req, res) => {
  try {
    const { favoriteMealIds, thisWeekMealIds } = await getStatusIds();
    let mealData = null;

    // 1. Try local database first
    const dbMeal = await Meal.findOne({ where: { idmeal: req.params.idmeal } });
    if (dbMeal) {
      mealData = dbMeal.get({ plain: true });
    } else {
      // 2. Fallback to TheMealDB API
      console.log(`Meal ${req.params.idmeal} not in DB, fetching from API...`);
      const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.idmeal}`);
      const apiData = await apiResponse.json();

      if (apiData.meals && apiData.meals.length > 0) {
        mealData = configureMealDBData(apiData.meals[0]);
      }
    }

    if (!mealData) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.render("meal", {
      mealData,
      favoriteMealIds,
      thisWeekMealIds
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/savedMeals", async (req, res) => {
  try {
    const myMealsRaw = await Meal.findAll();
    const favoriteMealsRaw = await Meal.findAll({
      where: {
        favorite: true,
      },
    });
    const { favoriteMealIds, thisWeekMealIds } = await getStatusIds();

    const myMeals = myMealsRaw.map((meal) => meal.get({ plain: true }));
    const favoriteMeals = favoriteMealsRaw.map((meal) =>
      meal.get({ plain: true }),
    );

    res.render("savedMeals", {
      myMeals: myMeals,
      favoriteMeals: favoriteMeals,
      favoriteMealIds,
      thisWeekMealIds
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    const { category, area, letter, name } = req.query;
    const { favoriteMealIds, thisWeekMealIds } = await getStatusIds();

    let rawResults = null;

    if (category) {
      console.log(`Searching by category: ${category}`);
      rawResults = await getMealbyCategory(category);
    } else if (area) {
      console.log(`Searching by area: ${area}`);
      rawResults = await getMealbyArea(area);
    } else if (letter) {
      console.log(`Searching by letter: ${letter}`);
      rawResults = await getMealbyFirstLetter(letter);
    } else if (name) {
      console.log(`Searching by name: ${name}`);
      rawResults = await getMealbyName(name);
    }

    console.log(`Raw results count: ${rawResults ? rawResults.length : 0}`);

    if (rawResults && rawResults.length > 0) {
      console.log(`Found ${rawResults.length} results for search.`);
    }

    const categories = await getAllCategories();
    const areas = await getAllAreas();
    const firstLetters = await getAllFirstLetters();

    res.render("searchPage", {
      categories,
      areas,
      firstLetters,
      searchResults: rawResults,
      favoriteMealIds,
      thisWeekMealIds
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
