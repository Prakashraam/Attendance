const express = require('express');
const router = express.Router();
const { getAttendance, addAttendance } = require('../controllers/attendanceController');

router.get('/', getAttendance);
router.post('/add', addAttendance);
router.get('/pdf', reportController.generatePDFReport);


module.exports = router;
