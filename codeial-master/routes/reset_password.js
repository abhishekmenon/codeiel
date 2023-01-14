const express = require('express');

const router = express.Router();

const resetPasswordController = require('../controllers/reset_password_controller');

router.get('/enter_email', resetPasswordController.enterEmail);
router.post('/send_email', resetPasswordController.sendEmail);
router.get('/change_password/', resetPasswordController.enterPassword);
router.post('/change_password/', resetPasswordController.resetPassword);


module.exports = router;