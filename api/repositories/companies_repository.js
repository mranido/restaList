'use strict';

const database = require('../infrastructure/database');

async function addCompany(company){
    const pool = await database.getPool();
    const query = `INSERT INTO company
        (companyName,
        email,
        manager,
        companyPassword,
        verificationCode
        ) VALUES(?,?,?,?,?)`;
    const [created] = await pool.query(query,[...Object.values(company)]);
    return created.insertId;
}

async function activateValidation(verificationCode) {
    const now = new Date();
  
    const pool = await database.getPool();
    const updateQuery = `UPDATE company
      SET verifiedAt = ?
      WHERE verificationCode = ?
      AND verifiedAt IS NULL`;
  
    const [resultActivation] = await pool.query(updateQuery, [now, verificationCode]);
  
    return (resultActivation.affectedRows === 1);
  }
  

async function login(email) {
    const pool = await database.getPool();
    const query = `SELECT id, email, companyName, verifiedAt, companyPassword
      FROM company
      WHERE email = ? `;
    const [company] = await pool.query(query, [email]);
    return company[0];
  }

async function getCompanyByEmail(email){
    const pool = await database.getPool();
    const query =`SELECT * FROM company WHERE email=?`;
    const [company] = await pool.query(query, [email]);
    return company[0];
}

async function getCompanyByVerificationCode(verificationCode) {
  const pool = await database.getPool();
  const query = `SELECT  email, companyName
  FROM company
  WHERE verificationCode = ?`;
  const [company] = await pool.query(query, [verificationCode]);

  return company[0];
}

async function findCompanyById(id) {
  const pool = await database.getPool();
  const query = `SELECT *
  FROM company
  WHERE id = ?`;
  const [company] = await pool.query(query, id);

  return company[0];
}

async function findAllCompanies() {
  const pool = await database.getPool();
  const query = `SELECT * FROM company WHERE deletedAt IS NULL`;
  const [allCompanies] = await pool.query(query);

  return allCompanies;
}

async function resetLink(link, id){
  const now = new Date();
  const pool = await database.getPool();
  const updateQuery =`UPDATE company
  SET resetLink = ?, updatedAt =?
  where id =?`;
  const [updateLink] = await pool.query(updateQuery, [link, now, id]);

  return updateLink;
}

async function resetPassword(companyPassword,id) {

  const pool = await database.getPool();
  const updateQuery = `UPDATE company
    SET companyPassword = ?
    WHERE id = ?`;

  const [resetPassword] = await pool.query(updateQuery, [companyPassword, id]);

  return resetPassword;
}


module.exports = {
                activateValidation,
                addCompany,
                findAllCompanies,
                findCompanyById, 
                getCompanyByEmail,
                getCompanyByVerificationCode,
                login,
                resetLink,
                resetPassword}


