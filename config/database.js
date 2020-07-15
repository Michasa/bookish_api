const Sequelize = require("sequelize");
const { db } = require("./appConfig");

const { host, database_name, username, password } = db;

const database = new Sequelize(database_name, username, password, {
  host: host,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = database;
