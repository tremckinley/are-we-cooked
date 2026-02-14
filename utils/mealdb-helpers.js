const getMealbyFirstLetter = async (letter) => {
    const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const mealsObject = await mealData.json();
    const configuredMeals = mealsObject.meals.map(meal => configureMealDBData(meal));
    return configuredMeals;
}

const getMealbyCategory = async (category) => {
    const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const mealsObject = await mealData.json();
    const configuredMeals = mealsObject.meals.map(meal => configureMealDBData(meal));
    return configuredMeals;
}

const getMealbyName = async (name) => {
    const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const mealsObject = await mealData.json();
    const configuredMeals = mealsObject.meals.map(meal => configureMealDBData(meal));
    return configuredMeals;
}

const getMealbyArea = async (area) => {
    const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const mealsObject = await mealData.json();
    const configuredMeals = mealsObject.meals.map(meal => configureMealDBData(meal));
    return configuredMeals;
}

const getRandomMeal = async () => {

    const getRandomLetter = () => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    };
    const getRandomIndex = (array) => {
        return Math.floor(Math.random() * array.length);
    };

    const randomLetter = getRandomLetter();
    const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${randomLetter}`);
    const mealsObject = await mealData.json();
    const randomIndex = getRandomIndex(mealsObject.meals);
    return configureMealDBData(mealsObject.meals[randomIndex]);
}

const configureMealDBData = (meal) => {
    if (!meal) return null;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure ? measure.trim() + " " : ""}${ingredient.trim()}`);
        }
    }

    return {
        name: meal.strMeal || "Unnamed Meal",
        description: meal.strInstructions ? `A delicious ${meal.strCategory || "meal"} from ${meal.strArea || "unknown"}.` : "No description available.",
        idmeal: meal.idMeal,
        category: meal.strCategory || "General",
        area: meal.strArea || "Global",
        instructions: meal.strInstructions || "Instructions not available.",
        thumbnail: meal.strMealThumb || "https://www.themealdb.com/images/media/meals/ll79y21500512899.jpg", // Placeholder
        youtube: meal.strYoutube || "",
        ingredients: ingredients,
        source: meal.strSource || "",
        thisweek: false,
        favorite: false
    };
}

const getAllCategories = async () => {
    const mealData = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
    const categoryObject = await mealData.json();
    return categoryObject.meals.map(meal => meal.strCategory);
}

const getAllAreas = async () => {
    const mealData = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    const areaObject = await mealData.json();
    return areaObject.meals.map(meal => meal.strArea);
}

const getAllFirstLetters = async () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet.split("");
}

module.exports = {
    getMealbyFirstLetter,
    getMealbyCategory,
    getMealbyName,
    getMealbyArea,
    getRandomMeal,
    configureMealDBData,
    getAllCategories,
    getAllAreas,
    getAllFirstLetters
};
