const { getAttendanceByEmployeeAndDateRange, insertAttendance } = require('../models/Attendance');
const { getEmployeeById } = require('../models/Employee');
const { getAllShifts } = require('../models/Shift');

const getAttendance = (req, res) => {
  const { employeeId, startDate, endDate } = req.query;

  getAttendanceByEmployeeAndDateRange(employeeId, startDate, endDate, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error fetching attendance data' });
    res.json(result);
  });
};

const addAttendance = (req, res) => {
  const { employeeId, date, inTime, outTime, shiftId, status } = req.body;

  getEmployeeById(employeeId, (err, employee) => {
    if (err) return res.status(500).json({ error: 'Error fetching employee data' });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    insertAttendance({ EmployeeID: employeeId, Date: date, InTime: inTime, OutTime: outTime, ShiftID: shiftId, Status: status }, (err, result) => {
      if (err) return res.status(500).json({ error: 'Error adding attendance' });
      res.status(201).json({ message: 'Attendance added successfully' });
    });
  });
};

module.exports = {
  getAttendance,
  addAttendance,
};
