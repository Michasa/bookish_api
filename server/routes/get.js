const { Router } = require("express");
const { validationResult } = require("express-validator");
const { QueryTypes } = require("sequelize");

const { Book, Author, Borrowed_Book, Admin } = require("../../models/tables");
const database = require("../../config/database");
const {
  ADMIN_LOGIN_VALIDATION,
} = require("../../utils/expressValidator/routesValidator");
const {
  generateErrorsArray,
} = require("../../utils/expressValidator/helperFunctions");

let router = Router();

router.get("/admin", ADMIN_LOGIN_VALIDATION, (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsArray = generateErrorsArray(errors);
    return res.status(422).send(errorsArray);
  }

  let filter = req.query.email
    ? { email: req.query.email }
    : { id: req.query.id };

  Admin.findOne({ where: filter }).then((result) => {
    res.status(200).json({ user: result });
  });
});

router.get("/authors", (req, res) => {
  let { id } = req.query;
  let filter = {};

  if (id && Number(id)) {
    filter = { where: { id: id }, include: Book };
  }
  Author.findAll(filter).then((result) => {
    res.status(200).send(result);
  });
});

router.get("/authors/search/:query", async (req, res) => {
  const { query } = req.params;
  database
    .query(
      "SELECT * FROM authors WHERE INSTR(author_name,:userQuery) ORDER BY INSTR(author_name,:userQuery)",
      { replacements: { userQuery: query }, type: QueryTypes.SELECT }
    )
    .then((authors) => {
      res.status(200).send(authors);
    });
});

router.get("/books", (req, res) => {
  let { id } = req.query;

  let filter = {};

  if (id && Number(id)) {
    filter = { where: { id: id }, include: Author };
  }

  Book.findAll(filter)
    .then((results) => {
      res.status(200).send({ results });
    })
    .catch((err) => console.log(err));
});

router.get("/books/search/:query", async (req, res) => {
  const { query } = req.params;

  let matchedBooks = await database.query(
    "SELECT * FROM books JOIN authors ON authors.id=books.author_id WHERE INSTR(title,:userQuery) ORDER BY INSTR(title,:userQuery), LENGTH(title)",
    {
      replacements: { userQuery: query },
      type: QueryTypes.SELECT,
      exclude: ["id", "author_id"],
    }
  );
  matchedBooks
    ? res.status(200).json({ results: matchedBooks })
    : res.status(400).json({ results: [] });
});

router.get("/borrowed-books", (req, res) => {
  let { member_id } = req.query;

  let filter = { where: { return_date: null } };

  if (member_id) {
    filter = { where: { return_date: null, member_id } }; // will include their books too
  }
  Borrowed_Book.findAll(filter)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
