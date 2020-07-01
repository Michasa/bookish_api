const express = require("express");
const bodyParser = require("body-parser");

const { database } = require("./database");
const getRoutes = require("./routes/get");
const postRoutes = require("./routes/post");

const app = express();

const {
  application: { port },
} = require("./config");

app.use(bodyParser.json());

app.use("/get", getRoutes(database));
app.use("/post", postRoutes(database));

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.get("*", (req, res) => {
  res.send("404 Page Not Found");
});

app.listen(port, () => {
  console.log(`Listening Hit me up on http://localhost:${port}`);
});
