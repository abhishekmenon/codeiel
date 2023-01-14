const express = require('express');
const router = express.Router();

const friendshipController = require('../controllers/friendship_controller');

router.get('/add_friend/:id', friendshipController.addFriend);
router.get('/remove_friend/:id', friendshipController.removeFriend);
module.exports = router;