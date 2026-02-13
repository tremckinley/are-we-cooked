async function addSavedMeal(mealData) {
    try {
        const response = await fetch(`/api/savedMeals/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mealData),
        });
        const data = await response.json();
        console.log("Meal added:", data);
        location.reload();
    } catch (error) {
        console.error("Error adding meal:", error);
    }
}

async function deleteSavedMeal(mealId) {
    try {
        const response = await fetch(`/api/savedMeals/${mealId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log("Meal deleted:", data);
        location.reload();
    } catch (error) {
        console.error("Error deleting meal:", error);
    }
}

async function updateSavedMeal(mealId, mealData) {
    try {
        const response = await fetch(`/api/savedMeals/${mealId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mealData),
        });
        const data = await response.json();
        console.log("Meal updated:", data);
        location.reload();
    } catch (error) {
        console.error("Error updating meal:", error);
    }
}