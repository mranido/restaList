'use strict';

const express = require('express');

const router = express.Router();

const validateAuthCompany = require('../middlewares/validate_auth_company');
const {registerOffice} = require('../controllers/office/register-office');
const {getAllOfficesPerCompany} = require('../controllers/office/get-office-per-company');
const {getAllOfficesPerManager} = require('../controllers/office/get-office-per-manager');
const {deleteOfficeById} = require('../controllers/office/delete-office-by-id');
const { getOfficePerId } = require('../controllers/office/get-office-per-id');

router.route('/registerOffice').all(validateAuthCompany).post(registerOffice);
router.route('/:id').all(validateAuthCompany).get(getAllOfficesPerCompany);
router.route('/search/:id/:manager').all(validateAuthCompany).get(getAllOfficesPerManager);
router.route('/deleteOffice/:id').all(validateAuthCompany).put(deleteOfficeById);
router.route('/getOffice/:id').all(validateAuthCompany).get(getOfficePerId)

module.exports = router;