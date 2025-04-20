const { db } = require('../config/db');

const getShiftById = (shiftId, callback) => {
  db.query('SELECT * FROM Shifts WHERE ShiftID = ?', [shiftId], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

const getAllShifts = (callback) => {
  db.query('SELECT * FROM Shifts', (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const assignShiftToEmployee = (employeeId, shiftId, callback) => {
  db.query(
    'UPDATE Employees SET ShiftID = ? WHERE EmployeeID = ?',
    [shiftId, employeeId],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

module.exports = {
  getShiftById,
  getAllShifts,
  assignShiftToEmployee,
};
