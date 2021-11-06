'use strict';

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');

const {getOfficesPerManager} = require('../../repositories/offices_repository');

async function getAllOfficesPerManager (req, res){
    try {
        
        const {id: idCompany} = req.auth;
        const {manager, id} = req.params;

        if(+id !== idCompany){
          throwJsonError('No tienes permiso para realizar dicha acción', 401);
        }
        
        const allOffices = await getOfficesPerManager(idCompany, manager.toLowerCase());
        
        if (allOffices.length ===0){
            throwJsonError('No hay ninguna sucursal para esa compañía y ese manager', 400);
        }

        res.send(allOffices).status(200);
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports ={getAllOfficesPerManager};