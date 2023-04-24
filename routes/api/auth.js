const express = require('express');
const router = express.Router();
const { validateUser, userAuth } = require('../../middlewares');
const ctrl = require('../../controllers/auth');
const { schemas } = require('../../models/user');

router.post('/register', validateUser(schemas.registerSchema), ctrl.register);

router.post('/login', validateUser(schemas.loginSchema), ctrl.login);

router.get('/current', userAuth, ctrl.getCurrentUser);

router.post('/logout', userAuth, ctrl.logout);

router.patch('/', userAuth, ctrl.updateSubscription);

module.exports = router;