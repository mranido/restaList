'use strict';

const express = require('express');

const router = express.Router();

const validateAuthCompany = require('../middlewares/validate_auth_company');
const {registerOffice} = require('../controllers/office/register-office');

router.route('/registerOffice').all(validateAuthCompany).post(registerOffice);

module.exports = router;