const router = require("express").Router();
const { Meal } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const mealData = await Meal.create(req.body);
        res.status(200).json(mealData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", async(req, res) => {
    try {
        const mealData = await Meal.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(mealData);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const mealData = await Meal.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(mealData);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
