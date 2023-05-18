const { service } = require("../../models");

const getAll = async (_, res) => {
  const result = await service.getContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
