'use strict';

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const {findAllCompanies} = require('../../repositories/companies_repository');

async function getAllCompanies(req, res){
    try {
        const companies = await findAllCompanies();

        if(companies.length ===0){
            throwJsonError('No hay ninguna empresa de momento', 400)
        }
        
        res.status(200);
        res.send(companies);
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = {getAllCompanies};