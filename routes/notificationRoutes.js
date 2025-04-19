const express = require('express');
const router = express.Router();
const { createNotification, getNotifications } = require('../controllers/notificationController');

router.post('/send', createNotification);
router.get('/', getNotifications);

module.exports = router;
