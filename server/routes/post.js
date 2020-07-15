const { Router } = require("express");
const { validationResult } = require("express-validator");
const {
  NEW_ADMIN_VALIDATION,
} = require("../../utils/expressValidator/routesValidator");

const {
  Member,
  Author,
  Book,
  Borrowed_Book,
  Admin,
} = require("../../models/tables");

let router = Router();

router.post("/new-admin", NEW_ADMIN_VALIDATION, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errObj = [];
    errors.errors.map((error) => {
      errObj.push(error.msg);
    });
    return res.status(422).send(errObj);
  }

  try {
    let response = await Admin.create(req.body);
    let data = await response;
    return res.sendStatus(200).send(data);
  } catch (err) {
    errorsObj = [];
    err.errors.forEach((error) => errorsObj.push(error.message.split("_")[1]));

    return res.status(400).send(errorsObj);
  }
});

router.post("/new-member", (req, res) => {
  const { body } = req;
  Member.create(body)
    .then((result) => {
      if (result.id) {
        return res.status(200).send({
          newMemberAdded: true,
          data: result,
        });
      }
      throw err;
    })
    .catch((err) => {
      res.status(400).send({
        newMemberAdded: false,
        errors: err.errors,
      });
    });
});

router.post("/new-author", (req, res) => {
  const { body } = req;
  Author.create(body)
    .then((result) => {
      if (result.id) {
        return res.status(200).send({
          newAuthorAdded: true,
          data: result,
        });
      }
      throw err;
    })
    .catch((err) => {
      res.status(400).send({
        newAuthorAdded: false,
        errors: err.errors,
      });
    });
});

router.post("/new-book", (req, res) => {
  const { body } = req;
  Book.create(body)
    .then((result) => {
      if (result.id) {
        return res.status(200).send({
          newBookAdded: true,
          data: result,
        });
      }
      throw err;
    })
    .catch((err) => {
      res.status(400).send({
        newBookAdded: false,
        errors: err.errors,
      });
    });
});

router.post("/new-checkout", (req, res) => {
  const { body } = req;
  Borrowed_Book.create(body)
    .then(async (result) => {
      if (result.id) {
        let { due_date } = await Borrowed_Book.findByPk(result.id);
        return res.status(200).send({
          newBookCheckedOut: true,
          ...result.dataValues,
          due_date: due_date,
        });
      }
      throw err;
    })
    .catch((err) => {
      res.status(400).send({
        newBookCheckedOut: false,
        errors: err.errors,
      });
    });
});

module.exports = router;
