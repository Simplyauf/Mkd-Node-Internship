const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  username: "root",
  password: "",
  database: "day_1",
  host: "127.0.0.1",
  dialect: "mysql",
});

module.exports = sequelize;
