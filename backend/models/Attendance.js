const { db } = require('../config/db');

const getAttendanceByEmployeeAndDateRange = (employeeId, startDate, endDate, callback) => {
  db.query(
    'SELECT * FROM Attendance WHERE EmployeeID = ? AND Date BETWEEN ? AND ? ORDER BY Date',
    [employeeId, startDate, endDate],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

const insertAttendance = (data, callback) => {
  const { EmployeeID, Date, InTime, OutTime, ShiftID, Status } = data;
  db.query(
    'INSERT INTO Attendance (EmployeeID, Date, InTime, OutTime, ShiftID, Status) VALUES (?, ?, ?, ?, ?, ?)',
    [EmployeeID, Date, InTime, OutTime, ShiftID, Status],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

module.exports = {
  getAttendanceByEmployeeAndDateRange,
  insertAttendance,
};
