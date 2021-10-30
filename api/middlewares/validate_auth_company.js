'use strict';

const jwt = require('jsonwebtoken');
const createJsonError = require('../errors/create-json-error');
const { JWT_SECRET } = process.env;

/**
 * Extrae el JWT enviado en los encabezados de la solicitud sin verificar su vencimiento.
 * @returns {Object} Objeto de autenticación que contiene la identificación de usuario, el correo electrónico y la matriz de roles.
 * @param {Object} encabezados solicitan encabezados.
 * @returns {String} token extraído de los encabezados.
 */
function extractAccessToken(headers) {
  const { authorization } = headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new Error('Authorization required');
    error.status = 403;
    throw error;
  }

  return authorization.split(" ")[1];
  //return authorization.slice(7, authorization.length);
}


function validateAuthCompany (req, res, next){
  try{
    const token = extractAccessToken(req.headers);

    const decodedToken = jwt.verify(token, JWT_SECRET);
    //console.log(decodedToken);
    const { id, email, companyName } = decodedToken;

    req.auth = { id, email, companyName };

    next();
  } catch(error) {
    //console.log('error', error.message);
    //console.log('error', error.expiredAt);
    error.status = 401;
    createJsonError(error, res);
  }
}

module.exports = validateAuthCompany;