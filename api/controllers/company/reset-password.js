'use strict';

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const {findCompanyById, resetPassword} = require('../../repositories/companies_repository');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { sendPasswordUpdated } = require('../../helpers/mail-smtp');

const schema = Joi.object({
companyPassword: Joi.string().min(4).max(20).required(),
repeatCompanyPassword: Joi.ref('companyPassword')
});


async function changePasswordByEmail(req, res){
    try{
    const {id, link} = req.query;

    await schema.validateAsync(req.body);
    const {companyPassword, repeatCompanyPassword} = req.body;
    
    if(companyPassword !==repeatCompanyPassword){
      throwJsonError('Contraseñas no coinciden', 401);
    }
    const company = await findCompanyById(id);
    
    if(!company || company.id !== +(id)){
    throwJsonError('No hay ninguna empresa disponible con ese Id',409)
    }
    
    if(company.resetLink !== link){
      throwJsonError('Link no válido',409);
    }
    const passwordHash = await bcrypt.hash(companyPassword, 10);

    await resetPassword(passwordHash, id);

    await sendPasswordUpdated(company.companyName, company.email);
    
    res.status(201).json({message: 'Contraseña cambiada correctamente'});

    }catch(error){
    createJsonError(error, res)
}
    
}

module.exports = {
    changePasswordByEmail};