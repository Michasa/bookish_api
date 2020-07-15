const Sequelize = require("sequelize");
const database = require("../config/database");

const Author = database.define("author", {
  author_name: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

const Member = database.define("member", {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date_joined: Sequelize.DATE,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

const Admin = database.define("admin", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email address already in use!",
    },
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const Book = database.define("book", {
  title: Sequelize.STRING(200),
  author_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Author,
      key: "id",
    },
  },
  instock_quantity: Sequelize.INTEGER,
  checked_out_quantity: Sequelize.INTEGER,
});

const Borrowed_Book = database.define("borrowed_book", {
  book_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: "id",
    },
  },
  member_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Member,
      key: "id",
    },
  },
  checkout_date: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  due_date: {
    type: "TIMESTAMP",
  },
  return_date: "TIMESTAMP",
});

Author.hasMany(Book, {
  foreignKey: "author_id",
});

Book.belongsTo(Author, {
  foreignKey: "author_id",
});

module.exports = { Author, Member, Book, Borrowed_Book, Admin };
