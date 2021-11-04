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
const { getCompanyById } = require('../controllers/company/get-company-by-id');
const { deleteCompanyById } = require('../controllers/company/delete-company-by-id');
const { uploadLogoCompany } = require('../controllers/company/upload-logo');
const { deleteLogoCompany } = require('../controllers/company/delete-logo');
const { updateCompanyById } = require('../controllers/company/update-company-by-id');

router.route('/registerCompany').post(registerCompany);
router.route('/search/:id').get(getCompanyById);
router.route('/loginCompany').post(loginCompany);
router.route('/forgotPassword').patch(forgotPassword);
router.route('/resetPassword').patch(changePasswordByEmail);
router.route('/activation').get(activateCompany);
router.route('/allCompanies').get(getAllCompanies);
router.route('/updatePassword').all(validateAuthCompany).put(updatePassword);
router.route('/deleteCompany').all(validateAuthCompany).put(deleteCompanyById);
router.route('/uploadlogo').all(validateAuthCompany).post(uploadLogoCompany);
router.route('/deletelogo').all(validateAuthCompany).post(deleteLogoCompany);
router.route('/updateProfile').all(validateAuthCompany).put(updateCompanyById);
module.exports =router;