const express = require('express');
// const Joi = require('joi');

// const contacts = require('../../models/contacts');
// const { HttpError } = require('../../helpers');

const router = express.Router();

// const addSchema = Joi.object({a
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
// });

const ctrl = require('../../controllers/contacts');
const { validateContacts } = require('../../middlewares');
const schemas = require('../../schemas/contacts');

router.get('/', ctrl.getAllContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', validateContacts(schemas.addSchema), ctrl.addContact);

router.delete('/:id', ctrl.deleteContact);

router.put('/:id', validateContacts(schemas.addSchema), ctrl.updateContact);

module.exports = router;
