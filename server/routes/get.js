const { Router } = require("express");

let router = Router();

const getRoutes = (database) => {
  router.get("/books", (req, res) => {
    database.query("SELECT * FROM books", (err, results) => {
      if (err) throw new Error(err);
      res.send({ ...results });
    });
  });

  router.get("/books/author/:author_id", (req, res) => {
    const { author_id } = req.params;

    database.query(
      "SELECT * FROM books WHERE author_id=?",
      author_id,
      (err, results) => {
        if (err) throw err;

        if (results.length) {
          res.send({ ...results });
        } else {
          res
            .status(400)
            .send({ error: `Error, Author ID ${author_id} doesn't exist` });
        }
      }
    );
  });

  router.get("/authors", (req, res) => {
    database.query("SELECT * FROM authors", (err, results) => {
      if (err) throw new Error(err);
      res.send({ ...results });
    });
  });

  router.get("/authors/author/:author_id", (req, res) => {
    const { author_id } = req.params;

    database.query(
      "SELECT * FROM authors WHERE id=?",
      author_id,
      (err, results) => {
        if (err) throw err;

        if (results.length) {
          res.send({ ...results });
        } else {
          res
            .status(400)
            .send({ error: `Error, Author ID ${author_id} doesn't exist` });
        }
      }
    );
  });

  return router;
};

module.exports = getRoutes;
