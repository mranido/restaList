'use strict';

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const cryptoRandomString = require('crypto-random-string');
const createJsonError =require('../../errors/create-json-error');

const {addCompany, getCompanyByEmail} = require('../../repositories/companies_repository');
const { sendEmailRegistration } = require('../../helpers/mail-smtp');

const schema = Joi.object({
    companyName: Joi.string().min(1).max(240).required(),
    email: Joi.string().email().required(),
    manager: Joi.string().min(1).max(240).required(),
    companyPassword: Joi.string().min(4).max(20).required(),
    repeatPassword: Joi.ref('companyPassword'),
  });

async function registerCompany(req, res){
    try{const {body} = req;
    await schema.validateAsync(body);
    const {companyName, email, manager, companyPassword} = body;
    const company = await getCompanyByEmail(email);
    if(company){
        throwJsonError('Ya existe una empresa registrada con ese email!', 409);

    }
    const passwordHash = await bcrypt.hash(companyPassword, 10);
    const verificationCode = await cryptoRandomString({ length: 64 });
    const companyDB = { companyName, email, manager, passwordHash, verificationCode };
    const companyId = await addCompany(companyDB);

    await sendEmailRegistration(companyName, email, verificationCode) ;

    res.status(200);
    res.send({companyDB, companyId});
    }
    catch(error){
        createJsonError(error, res)
    }
}

module.exports= {registerCompany};