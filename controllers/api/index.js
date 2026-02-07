const router = require("express").Router();

const mealdbRoutes = require('./mealdbRoutes');
const savedMealRoutes = require('./savedMealRoutes');
const favoritesRoutes = require('./favoritesRoutes');

router.use('/favorites', favoritesRoutes);
router.use('/savedMeals', savedMealRoutes);
router.use('/meals', mealdbRoutes)

module.exports = router;