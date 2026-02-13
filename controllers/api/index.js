const router = require("express").Router();

const savedMealRoutes = require('./savedMealRoutes');

router.use('/savedMeals', savedMealRoutes);

module.exports = router;