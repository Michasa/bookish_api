const { Router } = require("express");

const { Book, Author, Borrowed_Book } = require("../../models/tables");

let router = Router();

router.put("/return-book", (req, res) => {
  let { return_date, checkout_id } = req.body;

  Borrowed_Book.update({ return_date }, { where: { id: checkout_id } })
    .then((result) => {
      if (result) {
        Borrowed_Book.destroy({ where: { id: checkout_id } });
        return res.status(200).send({ bookReturned: true });
      }
      res.status(200).send({});
    })
    .catch((err) => res.status(400).send({ error: err }));
});

module.exports = router;
