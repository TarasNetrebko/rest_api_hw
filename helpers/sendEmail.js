const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const mail = { ...data, from: "danjd3101@gmail.com" };
  await sgMail.send(mail);
  return true;
};

module.exports = sendMail;

/* ПРИКЛАД -----------nodemailer та інформації про лист-----------


// const nodemailer = require("nodemailer");

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465, // 465, 25, 2525
//   secure: true,
//   auth: {
//     user: "danjd3101@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport();

// const data = {
//   to: "zelenskiy@gmail.com",
//   subject: "Запрошення",
//   html: "Анджей та Боріс чекають вас у лазні!",
// };

*/
