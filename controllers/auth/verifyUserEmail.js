const { usersService } = require("../../service");
const { HttpError } = require("../../utils");

const verifyUserEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await usersService.findUserByVerificationToken(
    verificationToken
  );
  if (!user) {
    throw HttpError(404, "Not Found");
  }
  await usersService.updateVerify(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.json({
    status: "success",
    code: 200,
    data: {
      message: "Verification successful",
    },
  });
};

module.exports = verifyUserEmail;
