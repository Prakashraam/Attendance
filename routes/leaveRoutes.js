const express = require('express');
const router = express.Router();
const { applyForLeave, getLeaveHistory, approveLeave } = require('../controllers/leaveController');

router.post('/apply', applyForLeave);
router.get('/history', getLeaveHistory);
router.put('/approve', approveLeave);

module.exports = router;
