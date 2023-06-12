const { emailService } = require("../../service");
const { HttpError } = require("../../utils");

const verifyUserEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await emailService.findUserByVerificationToken(
    verificationToken
  );
  if (!user) {
    throw HttpError(404, "Not Found");
  }
  await emailService.updateVerify(user._id, {
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
