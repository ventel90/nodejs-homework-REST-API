const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const schemas = require('../../schemas/joiSchema');
const {
  isValidId,
  validateUpdateContacts,
  validateNewContacts,
  validatePatchBody,
  userAuth,
} = require('../../middlewares');

router.get('/', userAuth, ctrl.getAllContacts);

router.get('/:id', userAuth, isValidId, ctrl.getContactById);

router.post(
  '/',
  userAuth,
  validateNewContacts(schemas.addSchema),
  ctrl.addContact
);

router.delete('/:id', userAuth, isValidId, ctrl.deleteContact);

router.put(
  '/:id',
  isValidId,
  validateUpdateContacts(schemas.changeSchema), ctrl.updateContact
);

router.patch(
  '/:id/favorite',
  isValidId,
  validatePatchBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
