'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const {findCompanyById, updateCompany} = require('../../repositories/companies_repository');

const schema = Joi.object({
    address: Joi.string().min(3).max(50).required(),
    companyName: Joi.string().min(1).max(240).required(),
    email: Joi.string().email().required(),
    manager: Joi.string().min(1).max(240).required(),
    phono1: Joi.string().min(4).max(20).required(),
    phono2: Joi.string().min(0).max(20).optional(),
    phono3:Joi.string().min(0).max(20).required(),
    website: Joi.string().min(6).max(50).required()
  });


async function updateCompanyById(req, res){

    try {

    const {id} = req.auth;
    const { body } = req;
    await schema.validateAsync(body);
    
    const {address, companyName, email, manager, phono1, phono2, phono3, website} = body;

    
    const company = await findCompanyById(id);

    if(!company){
        throwJsonError('No hay compañía', 409);
    }
    
    await updateCompany({address, companyName, email, manager, phono1, phono2, phono3 , website, id});

    res.send({message:'Se ha actualizado correctamente tu perfil'}).status(204);
        
    } catch (error) {
        createJsonError(error, res)
    }

}

module.exports ={updateCompanyById};
