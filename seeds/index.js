const sequelize = require('../config/connection');
const { Meal } = require('../models');

const seedMeals = require('./meals.json');

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        await Meal.bulkCreate(seedMeals);
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

seedAll();