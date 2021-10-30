'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { login } = require('../../repositories/companies_repository');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');

const schema = Joi.object({
    email: Joi.string().email().required(),
    companyPassword: Joi.string().min(4).max(20).required()
});

async function loginCompany(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { email, companyPassword } = body;

    // 1. Buscamos el usuario en la base de datos
    const company = await login(email, companyPassword);
    console.log('--> user', company);
    // 2. Validamo sel usuario
    if ( !company ) {
      throwJsonError('No existe un usuario con ese email y password', 403);
    }
    const { id, companyName, verifiedAt } = company;
    // 3. Comprobamos que el password que nos están enviando es válido.
    const isValidPassword = await bcrypt.compare(companyPassword, company.companyPassword);
    if ( !isValidPassword ) {
      throwJsonError('No existe un usuario con ese email y password', 403);
    }
    // 4. Comprobamos que su cuenta esta activa
    if ( !verifiedAt ) {
      throwJsonError('Active su cuenta para poder acceder a nuestros servicios', 401);
    }
    const { JWT_SECRET, JWT_SESSION_TIME } = process.env;
    // 5. generar el JWT
    const tokenPayload = { id, email, companyName };
    const token = jwt.sign(
      tokenPayload,
      JWT_SECRET,
      { expiresIn: JWT_SESSION_TIME },
    );

    const response = {
      accessToken: token,
      expiresIn: JWT_SESSION_TIME,
    };

    res.status(200);
    res.send({response, company});
  } catch(error) {
    createJsonError(error, res);
  }
}

module.exports = { loginCompany };