const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const schemas = require('../../schemas/contacts');
const validateNewContacts = require('../../middlewares/validateNewContacts');
const { validateUpdateContacts } = require('../../middlewares');

router.get('/', ctrl.getAllContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', validateNewContacts(schemas.addSchema), ctrl.addContact);

router.delete('/:id', ctrl.deleteContact);

router.put(
  '/:id',
  validateUpdateContacts(schemas.updateSchema),
  ctrl.updateContact
);

module.exports = router;
