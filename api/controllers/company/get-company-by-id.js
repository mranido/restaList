'use strict';

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const {findCompanyById} = require('../../repositories/companies_repository');

async function getCompanyById(req, res){
    try {
        const {id} = req.params;
        const company = await findCompanyById(id);

        if(!company){
            throwJsonError('No existe compañía con ese id', 400)
        }
        
        res.status(200);
        res.send(company);
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = {getCompanyById};