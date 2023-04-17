const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const schemas = require('../../schemas/joiSchema');
const {
  isValidId,
  validateUpdateContacts,
  validateNewContacts,
  updateFavoriteStatus,
} = require('../../middlewares');

router.get('/', ctrl.getAllContacts);

router.get('/:id', isValidId, ctrl.getContactById);

router.post('/', validateNewContacts(schemas.addSchema), ctrl.addContact);

router.delete('/:id', isValidId, ctrl.deleteContact);

router.put(
  '/:id',
  isValidId,
  validateUpdateContacts(schemas.changeSchema), ctrl.updateContact
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  updateFavoriteStatus(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
