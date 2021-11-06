'use strict';

const throwJsonError = require('../../errors/throw-json-error');
const createJsonError = require('../../errors/create-json-error');
const {getOfficeById} = require('../../repositories/offices_repository');


async function getOfficePerId(req, res){
    try {
        const {id: companyId} = req.auth;
        const {id} = req.params;


        const hasOffice = await getOfficeById(id, companyId);
        if(!hasOffice){
            throwJsonError('No hay ninguna sucursal con ese id',400);
        }

        res.send(hasOffice).status(200)
        
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports ={getOfficePerId};