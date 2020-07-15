const { Router } = require("express");
const { Member, Book, Author } = require("../../models/tables");

let router = Router();

router.delete("/member/:member_id", (req, res) => {
  const { member_id } = req.params;
  Member.destroy({
    where: {
      id: member_id,
    },
  })
    .then((result) => {
      if (result) {
        return res
          .status(200)
          .send({ memberDeleted: true, matchedRows: result });
      }
      res.status(200).send({ memberDeleted: false, matchedRows: result });
    })
    .catch((error) => res.status(400).send(error));
});

router.delete("/book/:book_id", (req, res) => {
  const { book_id } = req.params;
  Book.destroy({
    where: {
      id: book_id,
    },
  })
    .then((result) => {
      if (result) {
        return res.status(200).send({ bookDeleted: true, matchedRows: result });
      }
      res.status(200).send({ bookDeleted: false, matchedRows: result });
    })
    .catch((error) => res.status(400).send(error));
});

// add a hook that wil returns the number of books deleted
// https://sequelize.org/master/manual/hooks.html
// https://sequelize.org/master/class/lib/model.js~Model.html#static-method-destroy
router.delete("/author/:author_id", (req, res) => {
  const { author_id } = req.params;
  Author.destroy({
    where: {
      id: author_id,
    },
  })
    .then((result) => {
      if (result) {
        return res
          .status(200)
          .send({ authorDeleted: true, matchedRows: result });
      }
      res.status(200).send({ authorDeleted: false, matchedRows: result });
    })
    .catch((error) => res.send(error));
});

module.exports = router;
