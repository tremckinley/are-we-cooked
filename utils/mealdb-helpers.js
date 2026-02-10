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

const getMealbyName = async (name) => {
    const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const mealsObject = await mealData.json();
    return mealsObject.meals;
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
    return mealsObject.meals[randomIndex];
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
        name: meal.strMeal,
        description: `A delicious ${meal.strCategory || "meal"} from ${meal.strArea || "unknown"}.`,
        idmeal: meal.idMeal,
        category: meal.strCategory,
        area: meal.strArea,
        instructions: meal.strInstructions,
        thumbnail: meal.strMealThumb,
        youtube: meal.strYoutube,
        ingredients: ingredients,
        source: meal.strSource,
        thisweek: false,
        favorite: false
    };
}

module.exports = {
    getMealbyFirstLetter,
    getMealbyCategory,
    getMealbyName,
    getRandomMeal,
    configureMealDBData
};
