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

async function getOfficeByName(officeName, companyId){
    const pool = await database.getPool();
    const query = `SELECT * FROM office
    WHERE officeName =?
    AND companyId =?`;
    const [findOffice] = await pool.query(query,[officeName, companyId]);

    return findOffice[0];
}

async function getOfficesPerCompany(companyId){
    const pool = await database.getPool();
    const query = `SELECT * FROM office 
    WHERE companyID =?`;
    const [officesPerCompany] = await pool.query(query, companyId);

    return officesPerCompany;
}




module.exports ={addOffice,
                getOfficeByName,
                getOfficesPerCompany}