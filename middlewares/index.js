const isValidId = require('./isValidId');
const validateUpdateContacts = require('./validateUpdContacts');
const validateNewContacts = require('./validateNewContacts');
const validatePatchBody = require('./validatePatchBody');

module.exports = {
  isValidId,
  validateUpdateContacts,
  validateNewContacts,
  validatePatchBody,
};
