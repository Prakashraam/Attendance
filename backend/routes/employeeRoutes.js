const express = require('express');
const router = express.Router();
const { login, getAllEmployees } = require('../controllers/employeeController');

router.post('/login', login);
router.get('/all', getAllEmployees);

module.exports = router;
