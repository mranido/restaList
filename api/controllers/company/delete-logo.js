'use strict';

const cryptoRandomString = require('crypto-random-string');
const createJsonError = require('../../errors/create-json-error');
const path = require('path');
const fs = require('fs');
const {
  findLogo,
  deleteLogo
} = require('../../repositories/companies_repository');
const throwJsonError = require('../../errors/throw-json-error');


async function deleteLogoCompany(req, res) {
  try {
    const { id } = req.auth;
    const { PATH_COMPANY_IMAGE } = process.env;

    const company = await findLogo(id);
    // Generamos la ruta completa a la carpeta donde situamos las imagenes de perfil
    const pathProfileImageFolder = `${__dirname}/../../public/${PATH_COMPANY_IMAGE}`;

    // Borramos la imagen original si existe
    if (!company.logo) {
        throwJsonError('No tienes ningún logo cargado', 400)
    }
    await deleteLogo(id);
    fs.unlink(`${pathProfileImageFolder}/${company.logo}`,() => {
        console.log('Borrada imagen de perfil correctamente');
      });


    res.send({message: 'Logo borrado correctamente'}).status(204);
    
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = { deleteLogoCompany };
