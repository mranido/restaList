'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const {getOfficeById, updateOffice} = require('../../repositories/offices_repository');

const schema = Joi.object({
    address: Joi.string().min(3).max(50).required(),
    officeName: Joi.string().min(1).max(240).required(),
    manager: Joi.string().min(1).max(240).required(),
    phono1: Joi.string().min(4).max(20).optional().allow('').allow(null),
  });


async function updateOfficeById(req, res){

    try {

    const {id: companyId} = req.auth;
    const {id} = req.params;
    const { body } = req;
    await schema.validateAsync(body);
    
    const {address, officeName, manager, phono1} = body;

    
    const company = await getOfficeById(id, companyId);

    if(!company){
        throwJsonError('No hay sucursal para esa compañía', 409);
    }
    
    await updateOffice({address, officeName, manager, phono1, id, companyId});

    res.send({message:'Se ha actualizado correctamente el perfil de la sucursal'}).status(204);
        
    } catch (error) {
        createJsonError(error, res)
    }

}

module.exports ={updateOfficeById};
