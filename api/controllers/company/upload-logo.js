'use strict';

const cryptoRandomString = require('crypto-random-string');
const createJsonError = require('../../errors/create-json-error');
const path = require('path');
const fs = require('fs');
const {
  findLogo,
  updateLogo
} = require('../../repositories/companies_repository');
const throwJsonError = require('../../errors/throw-json-error');


const validExtensions = ['.jpeg', '.jpg', '.png', '.svg'];

async function uploadLogoCompany(req, res) {
  try {
    const { id } = req.auth;

    console.log(req.files);
    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError('No se ha seleccionado ningún fichero', 400);
    }

    const { logo } = files;
    const extension = path.extname(logo.name);

    if (!validExtensions.includes(extension)) {
      throwJsonError('Formato no valido', 400);
    }

    const { HTTP_SERVER_DOMAIN, PATH_COMPANY_IMAGE } = process.env;
    // Cogemos la imagen de perfil original
    const company = await findLogo(id);
    console.log(company, 'Estoy aqui');
    // Generamos la ruta completa a la carpeta donde situamos las imagenes de perfil
    const pathProfileImageFolder = `${__dirname}/../../public/${PATH_COMPANY_IMAGE}`;
    console.log(pathProfileImageFolder);

    // Borramos la imagen original si existe
    if (company.logo) {
      await fs.unlink(`${pathProfileImageFolder}/${company.logo}`, () => {
        console.log('Borrada imagen de perfil correctamente');
      });
    }

    const random = cryptoRandomString({ length:10, type:'base64' });
    const logoName = `${id}-${random}${extension}`;
    // Path de la nueva imagen de perfil
    const pathImage = `${pathProfileImageFolder}/${logoName}`;
    //const pathImage = `${pathProfileImageFolder}/${id}${extension}`;
    console.log(pathImage)
    // Movemos la image a la ruta final /public/images/profiles/14-adfa324d.png
    logo.mv(pathImage, async function (err) {
      if (err) return res.status(500).send(err);
      await updateLogo(id, logoName);

      res.send({ url: `${HTTP_SERVER_DOMAIN}/${PATH_COMPANY_IMAGE}/${logoName}` });
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = { uploadLogoCompany };
