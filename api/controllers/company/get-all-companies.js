'use strict';

const createJsonError = require('../../errors/create-json-error');
const {findAllCompanies} = require('../../repositories/companies_repository');

async function getAllCompanies(req, res){
    try {
        const companies = await findAllCompanies();

        if(companies.length ===0){
            res.end('No hay ninguna empresa de momento')
        }
        
        res.status(200);
        res.send(companies);
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = {getAllCompanies};