const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Meal extends Model {}

Meal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    idmeal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {type: DataTypes.STRING, allowNull: true, },
    area: {type: DataTypes.STRING, allowNull: true, },
    instructions: {type: DataTypes.TEXT, allowNull: false},
    thumbnail: {type: DataTypes.STRING, allowNull: true, },
    youtube: {type: DataTypes.STRING, allowNull: true, },
    ingredients: {type: DataTypes.JSON, allowNull: false, defaultValue: []},
    source: {type: DataTypes.STRING, allowNull: true},
    thisweek: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    favorite: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "meal",
  },
);

module.exports = Meal;
