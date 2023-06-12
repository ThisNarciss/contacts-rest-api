const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, SENDGRID_SEND_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const emailOptions = { ...data, from: SENDGRID_SEND_EMAIL };
  await sgMail.send(emailOptions);
  return true;
};

module.exports = sendEmail;
