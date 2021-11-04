'use strict';

const {findCompanyById, inactiveCompanyById} = require('../../repositories/companies_repository');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');

async function deleteCompanyById(req, res){

    try{
    const {id} = req.auth;

    const companyToDelete = await findCompanyById(id);

    if(companyToDelete.deletedAt){
        throwJsonError('Ya está eliminada la cuenta', 403);
    }

    const inactive = await inactiveCompanyById(id);

    res.send({message: 'Tu cuenta ha sido eliminada'}, inactive).status(204);
    
    }
    catch(error){
        createJsonError(error,res)
    }
}

module.exports ={deleteCompanyById};