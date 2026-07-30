const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, // The 16-character App Password
  },
});

module.exports = transporter