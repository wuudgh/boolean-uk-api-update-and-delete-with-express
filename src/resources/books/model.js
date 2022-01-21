const { query } = require("express");
const db = require("../../utils/database");
const { buildBooksDatabase } = require("../../utils/mockData");

function Book() {
  function createTable() {
    const sql = `
      DROP TABLE IF EXISTS books;
      
      CREATE TABLE IF NOT EXISTS books (
        id              SERIAL        PRIMARY KEY,
        title           VARCHAR(255)   NOT NULL,
        type            VARCHAR(255)   NOT NULL,
        author          VARCHAR(255)   NOT NULL,
        topic           VARCHAR(255)   NOT NULL,
        publicationDate DATE           NOT NULL
      );
    `;

    return db
      .query(sql)
      .then((result) => console.log("[DB] Book table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createBook = `
      INSERT INTO books
        (title, type, author, topic, publicationDate)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const books = buildBooksDatabase();

    books.forEach((book) => {
      db.query(createBook, Object.values(book)).catch(console.error);
    });
  }

  createTable().then(() => {
    console.log("\nCreating mock data for Books...\n");

    mockData();
  });
}
async function createOneBook(bookData) {
  const createBookSql = `
      INSERT INTO books
        (title, type, author, topic, publicationDate)
      VALUES
        ($1, $2, $3, $4, $5)
    `;
  const data = [
    bookData.title,
    bookData.type,
    bookData.author,
    bookData.topic,
    bookData.publicationDate,
  ];
  return db
    .query(createBookSql, data)
    .then((res) => {
      console.log("my result", res);
    })
    .catch("my error", console.error);
}

async function getAll(res) {
  const getAll = `
  SELECT * 
   FROM books;
   `;

  return db
    .query(getAll)
    .then((result) => result.rows)
    .catch(console.error);
}

module.exports = {
  Book,
  createOneBook,
  getAll,
};
