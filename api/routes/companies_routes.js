'use strict';

const express = require('express');

const router = express.Router();

const {registerCompany} = require('../controllers/company/register-company');
const {activateCompany} =require('../controllers/company/activate-account');
const {loginCompany} = require('../controllers/company/login-company');
const {getAllCompanies} = require('../controllers/company/get-all-companies'); 
const {forgotPassword} = require('../controllers/company/forgot-password');
const {changePasswordByEmail} = require('../controllers/company/reset-password');
const validateAuthCompany = require('../middlewares/validate_auth_company');
const { updatePassword } = require('../controllers/company/update-password');

router.route('/registerCompany').post(registerCompany);
router.route('/loginCompany').post(loginCompany);
router.route('/forgotPassword').patch(forgotPassword);
router.route('/resetPassword').patch(changePasswordByEmail);
router.route('/activation').get(activateCompany);
router.route('/allCompanies').get(getAllCompanies);
router.route('/updatePassword').all(validateAuthCompany).put(updatePassword);

module.exports =router;