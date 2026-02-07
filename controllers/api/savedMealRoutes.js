const router = require("express").Router();
//const { savedMeal } = require("../../models");

// TODO: POST /api/savedMeal (logged in only)
router.post("/", async (req, res) => {
  try {
    res.status(501).json({ message: "Not implemented yet" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: DELETE /api/savedMeal/:id (owner only)
router.delete("/:id", async (req, res) => {
  try {
    res.status(501).json({ message: "Not implemented yet" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
