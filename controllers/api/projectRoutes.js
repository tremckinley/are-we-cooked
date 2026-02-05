const router = require("express").Router();
const { Project } = require("../../models");
const withAuth = require("../../utils/auth");

// TODO: POST /api/projects (logged in only)
router.post("/", withAuth, async (req, res) => {
  try {
    res.status(501).json({ message: "Not implemented yet" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: DELETE /api/projects/:id (owner only)
router.delete("/:id", withAuth, async (req, res) => {
  try {
    res.status(501).json({ message: "Not implemented yet" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
