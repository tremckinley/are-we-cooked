const { Meal } = require("../models");

const getAllSavedMeals = async () => {
    const mealData = await Meal.findAll({
    });
    return mealData;
}

const getFavoriteMeals = async () => {
    const mealData = await Meal.findAll({
        where: {
            favorite: true,
        }
    });
    return mealData;
}

const getThisWeekMeals = async () => {
    const mealData = await Meal.findAll({
        where: {
            thisweek: true,
        }
    });
    return mealData;
}

module.exports = { getAllSavedMeals, getFavoriteMeals, getThisWeekMeals };