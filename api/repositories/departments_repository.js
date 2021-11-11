'use strict';

const database = require('../infrastructure/database');

async function addDepartment(department){
    const pool = await database.getPool();
    const query = `INSERT INTO deparment
        (departmentName,
        companyId
        ) VALUES(?,?)`;
    const [created] = await pool.query(query,[...Object.values(department)]);
    return created.insertId;
}

async function deleteDepartment(id, companyId){
    const now = new Date();
  
    const pool = await database.getPool();
  
    const updateQuery =`UPDATE department
    SET deletedAt=? 
    WHERE id=?
    AND companyId=?`;
    const [deleteaDepartment] = await pool.query(updateQuery, [now, id, companyId]);
  
    return deleteaDepartment;
  
  }

async function getDepartmentByName(departmentName, companyId){
    const pool = await database.getPool();
    const query = `SELECT * FROM department
    WHERE departmentName=?
    AND companyId=?`;
    const [findDepartment] = await pool.query(query,[departmentName, companyId]);

    return findDepartment[0];
}

async function getDepartmentsPerCompany(companyId){
    const pool = await database.getPool();
    const query = `SELECT * FROM department 
    WHERE companyId=?`;
    const [officesPerCompany] = await pool.query(query, companyId);

    return officesPerCompany;
}

async function getDepartmentById(id, companyId){
    const pool = await database.getPool();
    const query = `SELECT * FROM department
    WHERE id=?
    AND companyId=?`;
    const [officeById] = await pool.query(query, [id, companyId]);

    return officeById[0];
}

async function getDepartmentPerOfficeAndManager(companyId, manager){
    const pool = await database.getPool();
    const query = `SELECT * FROM department d 
    inner join department_per_office p on
    d.id = p.departmentId
    WHERE p.companyId=?
    AND lower(p.manager)=?`;
    const [departmentsPerManager] = await pool.query(query, [companyId, manager]);
    
    return departmentsPerManager;
}

async function updateDepartment(data){
    const now = new Date();
    const {id, companyId, address, officeName, manager, phono1} = data;
  
    const pool = await database.getPool();
  
    const updateQuery =`UPDATE department
    set  depatmentName=?, updatedAt=?
    where id =? and companyId =?`;
  
    await pool.query(updateQuery, [address, officeName, manager, phono1, now, id, companyId]);
  
    return true;
  }

  async function addDepartmentInAOffice(officeId, departmentId, companyId){

    const pool = await database.getPool();
    const query = `INSERT INTO deparmentPerOffice
        (departmentId,
        companyId,
        officeId
        ) VALUES(?,?,?)`;
    const [created] = await pool.query(query,[officeId, departmentId, companyId]);
    return created.insertId;

  }

  async function getDepartmentsPerOffice(companyId, officeId){
    const pool = await database.getPool();
    const query = `SELECT * FROM department d 
    inner join department_per_office p on
    d.id = p.departmentId
    WHERE p.companyId=?
    AND p.officeId=?`;
    const [officesPerManager] = await pool.query(query, [companyId, officeId]);
    
    return officesPerManager;
}


module.exports ={addDepartment,
                addDepartmentInAOffice,
                deleteDepartment,
                getDepartmentByName,
                getDepartmentById,
                getDepartmentsPerCompany,
                getDepartmentPerOfficeAndManager,
                updateDepartment,
                getDepartmentsPerOffice}