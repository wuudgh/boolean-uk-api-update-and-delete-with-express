const { createOneBook, getAll } = require("./model");

async function createOne(req, res) {
  const BookToCreate = {
    ...req.body,
  };
  const thisRes = await createOneBook(BookToCreate);

  return res.json({ data: thisRes });
}

async function getAllBooks(req, res) {
  //const all = Book().getAll;
  const thisRes = await getAll(res);
  console.log("my result", thisRes);
  return res.json({ data: thisRes });
}

module.exports = {
  createOne,
  getAllBooks,
};

//curl -X POST -H "Content-Type: application/json" -d
