const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

require("dotenv").config();

const sequelize = require("./config/connection");
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  helpers: {
    format_date: (date) => {
      const d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    },
    is_included: (val, arr) => {
      if (!arr || !Array.isArray(arr)) {
        return false;
      }
      return arr.includes(val);
    },
    json: (context) => {
      return JSON.stringify(context);
    },
    // TODO: add format_amount helper
  },
});

const sess = {
  secret: process.env.SESSION_SECRET || "super_secret_session_key",
  cookie: {
    maxAge: 1000 * 60 * 30,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({ db: sequelize }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log(`🌐 Server listening on http://localhost:${PORT}`),
  );
});