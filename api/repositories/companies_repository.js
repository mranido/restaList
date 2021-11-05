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

  async function inactiveCompanyById(id){
    const now = new Date();

    const pool = await database.getPool();
    const updateQuery =`UPDATE company
    set deletedAt =?
    where id = ?`

    const [deleteCompany] = await pool.query(updateQuery, [now, id]);

    return (deleteCompany.affectedRows===1);
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

async function findLogo(id){
  const pool = await database.getPool();
  const query =`SELECT logo FROM company WHERE id = ?`;
  const [haslogo]= await pool.query(query, id);
  
  return haslogo[0];
}


async function updateLogo(id, logo){
  const now = new Date();
  const pool = await database.getPool();
  const updateQuery =`UPDATE company 
  SET logo =?, updatedAt =? 
  WHERE id =?`;
  const [imageCreated] = await pool.query(updateQuery, [logo, now, id]);

  return imageCreated[0];
}

async function updateCompany(data){
  const now = new Date();
  const {id, address, companyName, email, manager, phono1, phono2, phono3, website} = data;

  const pool = await database.getPool();

  const updateQuery =`UPDATE company
  set address =?, companyName=?, email =?, manager =?, phono1=?, phono2=?, phono3=?, website=?, updatedAt=?
  where id =?`;

  await pool.query(updateQuery, [address, companyName, email, manager, phono1, phono2, phono3, website, now, id]);

  return true;
}

async function deleteLogo(id){
  const now = new Date();

  const pool = await database.getPool();

  const updateQuery =`UPDATE company 
  SET logo = null, updatedAt =? 
  WHERE id =?`;
  const [deleteImage] = await pool.query(updateQuery, [now, id]);

  return deleteImage;

}

async function resetLink(link, id){
  const now = new Date();
  const pool = await database.getPool();
  const updateQuery =`UPDATE company
  SET resetLink = ?, updatedAt =?
  where id = ?`;
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
                deleteLogo,
                findAllCompanies,
                findCompanyById, 
                findLogo,
                getCompanyByEmail,
                getCompanyByVerificationCode,
                inactiveCompanyById,
                login,
                resetLink,
                resetPassword,
                updateCompany,
                updateLogo}


