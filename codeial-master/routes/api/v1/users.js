const express = require('express');
const router = express.Router();

const userApiController = require('../../../controllers/api/v1/user_api');

router.post('/createSession', userApiController.createSession);

module.exports = router;