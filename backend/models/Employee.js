const { db } = require('../config/db');

const getEmployeeById = (employeeId, callback) => {
  db.query('SELECT * FROM Employees WHERE EmployeeID = ?', [employeeId], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

module.exports = {
  getEmployeeById,
};
