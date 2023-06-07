const { BASE_URL } = process.env;

const getVerifyData = (data) => {
  const verifyEmail = {
    to: data.email,
    subject: "Verification email",

    html: `<p>Good day!\n\nThank you for choosing our service for saving contacts. This is a confirmation email that your email address has been successfully registered.\n\nIf you received this email by accident or did not register on our site, please ignore it.\n\nIf you wish to complete the verification process, please follow the link below!</p>
    <a target="_blank" href="${BASE_URL}/api/users/verify/${data.verificationToken}">Click to verify your email</a>`,
  };
  return verifyEmail;
};

module.exports = getVerifyData;
