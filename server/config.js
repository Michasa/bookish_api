const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT } = process.env;

const config = {
  application: {
    port: PORT || 3000,
  },
  db: {
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
  },
};

module.exports = config;
