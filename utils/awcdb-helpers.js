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

const getStatusIds = async () => {
    const favorites = await getFavoriteMeals();
    const thisWeek = await getThisWeekMeals();

    return {
        favoriteMealIds: favorites.map(meal => meal.idmeal),
        thisWeekMealIds: thisWeek.map(meal => meal.idmeal),
    };
}

module.exports = { getAllSavedMeals, getFavoriteMeals, getThisWeekMeals, getStatusIds };