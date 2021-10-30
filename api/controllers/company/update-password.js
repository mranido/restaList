'use strict';

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const {findCompanyById, resetPassword} = require('../../repositories/companies_repository');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { sendPasswordUpdated } = require('../../helpers/mail-smtp');

const schema = Joi.object({
oldPassword: Joi.string().min(4).max(20).required(),    
newPassword: Joi.string().min(4).max(20).required(),
repeatNewPassword: Joi.ref('newPassword')
});

async function updatePassword(req, res){
    try{
    await schema.validateAsync(req.body);

    const {oldPassword, newPassword} = req.body;
    const {id, email, companyName} = req.auth;

    const company = await findCompanyById(id);

    const lastPassword = await bcrypt.compare(oldPassword, company.companyPassword);
    if(!lastPassword){
        throwJsonError('Contraseña  no correcta', 403);
    }

    const isTheSamePassword = await bcrypt.compare(newPassword, company.companyPassword);
    if(isTheSamePassword){
        throwJsonError('No introduzcas la misma contraseña que antes');
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);

    await resetPassword(passwordHash,id);

    await sendPasswordUpdated(companyName, email);

    res.status(201).send({message: 'Contraseña cambiada con éxito'});

    

    }catch(error){
        createJsonError(error, res);
    }
}

module.exports ={updatePassword};