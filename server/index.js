const express = require("express");
const bodyParser = require("body-parser");

const getRoutes = require("./routes/get");
const deleteRoutes = require("./routes/delete");
const postRoutes = require("./routes/post");
const updateRoutes = require("./routes/update");

const app = express();

const {
  application: { port },
} = require("../config/appConfig");
const database = require("../config/database");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use("/get", getRoutes);
app.use("/delete", deleteRoutes);
app.use("/post", postRoutes);
app.use("/update", updateRoutes);

app.get("*", (req, res) => {
  res.status(400).send({ error: "bad request" });
});

app.listen(port, () => {
  console.log(`Listening Hit me up on http://localhost:${port}`);
  database
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});
