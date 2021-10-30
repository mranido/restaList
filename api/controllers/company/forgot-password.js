'use strict';

const cryptoRandomString = require('crypto-random-string');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { sendPasswordForgot } = require('../../helpers/mail-smtp');
const {getCompanyByEmail, resetLink} = require('../../repositories/companies_repository');

async function forgotPassword(req, res){
    try{
        const {email} = req.body;

    if(!email){
        throwJsonError('Debes introducir un email', 400);
    }

    const isAnyCompany = await getCompanyByEmail(email);

    if(!isAnyCompany){
        throwJsonError('No hay ninguna empresa con ese id!', 400);
    }

    const {email: getEmail, id, companyName} = isAnyCompany;

    if(getEmail !== email){
        throwJsonError('Email no válido', 400);
    }

    const link = await cryptoRandomString({ length: 64 });
    const updateLink = await resetLink(link, id);
    console.log(updateLink);
    await sendPasswordForgot(id, companyName, getEmail, link);


    res.status(201).send({message: 'Te hemos enviado un correo para restablecer la contraseña',updateLink});
    }
    catch(error){
        createJsonError(error, res)
    }
}

module.exports = {forgotPassword};