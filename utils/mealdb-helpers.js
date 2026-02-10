const getMealbyFirstLetter = async (letter) => {
    const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const mealsObject = await mealData.json();
    return mealsObject.meals;
}

const getMealbyCategory = async (category) => {
    const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const mealsObject = await mealData.json();
    return mealsObject.meals;
}

module.exports = { getMealbyFirstLetter, getMealbyCategory };
