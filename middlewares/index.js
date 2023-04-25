const isValidId = require('./isValidId');
const validateUpdateContacts = require('./validateUpdContacts');
const validateNewContacts = require('./validateNewContacts');
const validatePatchBody = require('./validatePatchBody');
const validateUser = require('./validateUser');
const userAuth = require('./userAuth');
const upload = require('./upload');

module.exports = {
  isValidId,
  validateUpdateContacts,
  validateNewContacts,
  validatePatchBody,
  validateUser,
  userAuth,
  upload,
};
