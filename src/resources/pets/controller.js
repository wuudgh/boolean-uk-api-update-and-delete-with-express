const Pet = require("./model");

Pet().init();

async function createOne(req, res) {
  const PetToCreate = {
    ...req.body,
  };

  const createOne = Pet().createOnePet;
  const thisRes = await createOne(PetToCreate.name, res);

  return res.json({ data: thisRes });
}

module.exports = {
  createOne,
};
//This is POST command
//curl -X POST -H "Content-Type: application/json" -d

//This is a GET command
//curl https://reqbin.com/echo
