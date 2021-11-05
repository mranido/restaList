'use strict';

const Joi = require('joi');

const createJsonError =require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const {addOffice, getOfficeByName} = require('../../repositories/offices_repository');

const schema = Joi.object({
    officeName: Joi.string().min(1).max(240).required(),
    manager: Joi.string().min(1).max(240).required(),
  });

async function registerOffice(req, res){
    try{
    const {id : idCompany} = req.auth;
    const {body} = req;
    await schema.validateAsync(body);
    const {officeName, manager} = body;
    const office = await getOfficeByName(officeName ,idCompany);
    if(office){
        throwJsonError('Ya existe una sucursal registrada con ese nombre!', 409);

    }
    console.log((idCompany));

    const newOffice = {officeName, manager, idCompany}
    const officeId = await addOffice(newOffice);

    res.status(200);
    res.send({officeId , newOffice});
    }
    catch(error){
        createJsonError(error, res)
    }
}

module.exports= {registerOffice};