const { usersService } = require("../../service");
const { HttpError } = require("../../utils");
const { subValid } = require("../../utils");

const updateSub = async (req, res) => {
  const { subscription } = req.body;
  const { _id: id } = req.user;
  subValid(subscription);
  const subsEqualArr = ["starter", "pro", "business"];
  if (!subsEqualArr.includes(subscription)) {
    throw HttpError(400, "Invalid subscription value");
  }
  const result = await usersService.updateSubscription(id, subscription);

  res.json({
    status: "success",
    code: 200,
    data: { email: result.email, subscription: result.subscription },
  });
};

module.exports = updateSub;
