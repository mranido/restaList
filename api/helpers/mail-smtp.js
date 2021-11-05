'use strict';

const nodemailer = require('nodemailer');

const {
  HTTP_SERVER_DOMAIN,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  SMTP_SECURE
} = process.env

const transporter = nodemailer.createTransport({
  port: SMTP_PORT,
  host: SMTP_HOST,
  auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
  },
  secure: SMTP_SECURE
});

async function sendEmailRegistration(companyName, email, verificationCode) {
  const linkActivation = `${HTTP_SERVER_DOMAIN}/api/v1/company/activation?verification_code=${verificationCode}`;

  const mailData = {
    from: SMTP_FROM,
    to: email,
    subject:  'Bienvenido a RestaList',
    text: `Hi ${companyName}, To confirm the account activate it here: ${linkActivation}`,
    html: `Hi ${companyName}, To confirm the account <a href="${linkActivation}">activate it here</a>`,
  };
  console.log('mailData', mailData);
  const data = await transporter.sendMail(mailData);

  return data;
  
}

async function sendEmailCorrectValidation(companyName, email) {
  const mailData = {
    from: SMTP_FROM,
    to: email,
    subject:  '[Resta List] Cuenta Activada!',
    text: `Hi ${companyName},\n Your account was be activated. Enjoy our apps`,
    html: `<p>Hi ${companyName},</p><p>Your account was be activated. Enjoy our app!</p>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendPasswordForgot(id, companyName, email, link) {
  const linkActivation = `${HTTP_SERVER_DOMAIN}/api/v1/company/resetPassword?id=${id}&link=${link}`;

  const mailData = {
    from: SMTP_FROM,
    to: email,
    subject:  'Restablecer contraseña',
    text: `Hi ${companyName}, Para restablecer la contraseña haz click aquí ${linkActivation}`,
    html: `Hi ${companyName}, Para restablecer la contraseña <a href="${linkActivation}">haz click aquí </a>`,
  };
  console.log('mailData', mailData);
  const data = await transporter.sendMail(mailData);

  return data;
  
}

async function sendPasswordUpdated(companyName, email){
  const mailData = {
    from: SMTP_FROM,
    to: email,
    subject:  'Cambio de contraseña',
    text: `Hola ${companyName}, Tu contraseña se ha cambiado correctamente `,
    html: `Hola ${companyName}, Tu contraseña se ha cambiado correctamente`,
  };
  console.log('mailData', mailData);
  const data = await transporter.sendMail(mailData);

  return data;
    
  
}


module.exports = {
  sendEmailRegistration,
  sendEmailCorrectValidation,
  sendPasswordForgot,
  sendPasswordUpdated
};