const { db } = require('../config/db');

const applyLeave = (leave, callback) => {
  const { EmployeeID, LeaveType, StartDate, EndDate, Status } = leave;
  db.query(
    'INSERT INTO Leaves (EmployeeID, LeaveType, StartDate, EndDate, Status) VALUES (?, ?, ?, ?, ?)',
    [EmployeeID, LeaveType, StartDate, EndDate, Status],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

const getLeavesByEmployee = (employeeId, callback) => {
  db.query('SELECT * FROM Leaves WHERE EmployeeID = ?', [employeeId], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const updateLeaveStatus = (leaveId, status, callback) => {
  db.query(
    'UPDATE Leaves SET Status = ? WHERE LeaveID = ?',
    [status, leaveId],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

module.exports = {
  applyLeave,
  getLeavesByEmployee,
  updateLeaveStatus,
};
