const express = require('express');
const router = express.Router();
const { validateUser, userAuth, upload } = require('../../middlewares');
const ctrl = require('../../controllers/auth');
const { schemas } = require('../../models/user');

router.post('/register', validateUser(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verify);

router.post(
  '/verify',
  validateUser(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post('/login', validateUser(schemas.loginSchema), ctrl.login);

router.get('/current', userAuth, ctrl.getCurrentUser);

router.post('/logout', userAuth, ctrl.logout);

router.patch('/', userAuth, ctrl.updateSubscription);

router.patch("/avatars", userAuth, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;