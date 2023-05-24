const { contactsService } = require("../../service");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  console.log(req.query);
  const result = await contactsService.getContacts(owner, req.query);
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
