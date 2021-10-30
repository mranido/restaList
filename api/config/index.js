require("dotenv").config();
//require("dotenv").config({path: "../index.js})

console.log(process.env.PORT)
module.exports = {
  api: { port: process.env.PORT, host: process.env.HOST },
  db: {
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: process.env.DB_TIMEZONE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    sesion: process.env.JWT_SESSION_TIME,
  },
  files: {
    userImage: process.env.PATH_USERS_IMAGE,
  },
  nodemailer: {
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM,
  },
};
