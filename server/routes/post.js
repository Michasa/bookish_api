const { Router } = require("express");

let router = Router();

const postRoutes = (database) => {
  router.post("/new-member", (req, res) => {
    const { body } = req;
    database.query("INSERT INTO members SET ?", body, (err, result) => {
      if (err) {
        res.send({ error: `Missing or incorrect format, Please try again` });
        throw err;
      }
      res.send({ success: "user added" });
    });
  });

  router.post("/new-author", (req, res) => {
    const { body } = req;
    database.query("INSERT INTO authors SET ?", body, (err, result) => {
      if (err) {
        res.send({ error: `Missing or incorrect format, Please try again` });
        throw err;
      }
      res.send({ success: "author added" });
    });
  });

  router.post("/new-book", (req, res) => {
    const { body } = req;
    database.query("INSERT INTO books SET ?", body, (err, result) => {
      if (err) {
        res.send({ error: `Missing or incorrect format, Please try again` });
        throw err;
      }
      res.send({ success: "book added" });
    });
  });

  router.post("/new-checkout", (req, res) => {
    const { body } = req;
    database.query("INSERT INTO borrowed_books SET ?", body, (err, result) => {
      if (err) {
        res
          .status(400)
          .send({ error: `Missing or incorrect format, Please try again` });
        throw err;
      }
      console.log(result);
      res.send({ success: "book checked out, please return on..." });
    });
  });
  return router;
};

module.exports = postRoutes;
