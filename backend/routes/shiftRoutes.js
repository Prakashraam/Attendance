const express = require('express');
const router = express.Router();
const { getShifts, assignShift } = require('../controllers/shiftcontroller');

router.get('/', getShifts);
router.post('/assign', assignShift);

module.exports = router;
