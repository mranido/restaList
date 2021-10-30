'use strict';
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error')
const {
  activateValidation,
  getCompanyByVerificationCode,
} = require('../../repositories/companies_repository');
const { sendEmailCorrectValidation } = require('../../helpers/mail-smtp');

async function activateCompany(req, res) {
  try {
    const {
      verification_code: verificationCode,
    } = req.query;

    if (!verificationCode) {
      throwJsonError('Invalid Verification Code', 409);
    }

    const isActivated = await activateValidation(verificationCode);

    if (!isActivated) {
      throwJsonError('Account not activated, verification code expired', 400);
    }

    const company = await getCompanyByVerificationCode(verificationCode);
    const { companyName, email } = company;
    await sendEmailCorrectValidation(companyName, email);

    res.send({ message: 'account activated' });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = { activateCompany };