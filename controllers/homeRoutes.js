const router = require("express").Router();
const { Meal } = require("../models");


router.get("/", async (req, res) => {
  try {
    const projectData = await Project.findAll({
      include: [{ model: User, attributes: ["name"] }],
      order: [["date_created", "DESC"]],
    });
    const projects = projectData.map((p) => p.get({ plain: true }));

    res.render("home", {
      projects,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/project/:id", async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["name"] }],
    });

    if (!projectData)
      return res
        .status(404)
        .render("404", { logged_in: req.session.logged_in });

    const project = projectData.get({ plain: true });
    res.render("project", {
      project,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // TODO: If logged in, redirect to /profile
  res.render("login");
});

router.get(
  "/profile",
  /* TODO: protect with withAuth */ async (req, res) => {
    // TODO: Query the logged-in user and include their projects, then render profile
    res.render("profile", { name: "TODO", projects: [], logged_in: true });
  },
);

module.exports = router;
