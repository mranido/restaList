'use strict';

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');

const {getOfficesPerCompany} = require('../../repositories/offices_repository');

async function getAllOfficesPerCompany (req, res){
    try {
        
        const {id: idCompany} = req.auth;
        const {id} = req.params;

        if(+id !== idCompany){
          throwJsonError('No tienes permiso para realizar dicha acción', 401);
        }
        
        const allOffices = await getOfficesPerCompany(idCompany);
        
        if (!allOffices){
            throwJsonError('No hay ninguna sucursal para esa compañía', 400);
        }

        res.send(allOffices).status(200);
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports ={getAllOfficesPerCompany};