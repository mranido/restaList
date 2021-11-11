'use strict';

const database = require('../infrastructure/database');

async function addOffice(office){
    const pool = await database.getPool();
    const query = `INSERT INTO office
        (officeName,
        manager,
        companyId
        ) VALUES(?,?,?)`;
    const [created] = await pool.query(query,[...Object.values(office)]);
    return created.insertId;
}

async function deleteOffice(id, companyId){
    const now = new Date();
  
    const pool = await database.getPool();
  
    const updateQuery =`UPDATE office
    SET deletedAt=? 
    WHERE id=?
    AND companyId=?`;
    const [deleteOffice] = await pool.query(updateQuery, [now, id, companyId]);
  
    return deleteOffice;
  
  }

async function getOfficeByName(officeName, companyId){
    const pool = await database.getPool();
    const query = `SELECT * FROM office
    WHERE officeName=?
    AND companyId=?`;
    const [findOffice] = await pool.query(query,[officeName, companyId]);

    return findOffice[0];
}

async function getOfficesPerCompany(companyId){
    const pool = await database.getPool();
    const query = `SELECT * FROM office 
    WHERE companyId=?`;
    const [officesPerCompany] = await pool.query(query, companyId);

    return officesPerCompany;
}

async function getOfficeById(id, companyId){
    const pool = await database.getPool();
    const query = `SELECT * FROM office
    WHERE id=?
    AND companyId=?`;
    const [officeById] = await pool.query(query, [id, companyId]);

    return officeById[0];
}

async function getOfficesPerManager(companyId, manager){
    const pool = await database.getPool();
    const query = `SELECT * FROM office
    WHERE companyId=?
    AND lower(manager)=?`;
    const [officesPerManager] = await pool.query(query, [companyId, manager]);
    
    return officesPerManager;
}

async function updateOffice(data){
    const now = new Date();
    const {id, companyId, address, officeName, manager, phono1} = data;
  
    const pool = await database.getPool();
  
    const updateQuery =`UPDATE office
    set address =?, officeName=?, manager =?, phono1=?, updatedAt=?
    where id =? and companyId =?`;
  
    await pool.query(updateQuery, [address, officeName, manager, phono1, now, id, companyId]);
  
    return true;
  }


module.exports ={addOffice,
                deleteOffice,
                getOfficeByName,
                getOfficeById,
                getOfficesPerCompany,
                getOfficesPerManager,
                updateOffice}