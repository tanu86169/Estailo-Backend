const transporter = require('../config/email');

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      html: html
    });

    console.log("Email Sent!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;