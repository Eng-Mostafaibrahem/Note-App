// import nodemailer from "nodemailer";

// export const sendEmailService = async({
//   to = "",
//   subject = "test email",
//   text = "this is a test email",
// } = {}) => {
//   //create transporter  ( transporter configration)
//   const transporter = nodemailer.createTransport({
//     host: "localhost",
//     port: 465,
//     seccure: true,
//     auth: {
//       //credentials email
//       user: "eng.mostafaibrahem.99@gmail.com",
//       pass: "123456",
//     },
//   });

//   const sendemail = await transporter.sendMail({
//     from:"TestNodemailer<eng.mostafaibrahem.99@gmail.com>",
//     to,
//     subject,
//     text,
//   })

//   return sendemail
// };
