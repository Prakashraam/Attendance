const { applyLeave, getLeavesByEmployee, updateLeaveStatus } = require('../models/Leave');
const { getEmployeeById } = require('../models/Employee');

const applyForLeave = (req, res) => {
  const { employeeId, leaveType, startDate, endDate } = req.body;

  getEmployeeById(employeeId, (err, employee) => {
    if (err) return res.status(500).json({ error: 'Error fetching employee data' });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    const leave = { EmployeeID: employeeId, LeaveType: leaveType, StartDate: startDate, EndDate: endDate, Status: 'Applied' };
    applyLeave(leave, (err, result) => {
      if (err) return res.status(500).json({ error: 'Error applying for leave' });
      res.status(201).json({ message: 'Leave applied successfully' });
    });
  });
};

const getLeaveHistory = (req, res) => {
  const { employeeId } = req.query;

  getLeavesByEmployee(employeeId, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error fetching leave history' });
    res.json(result);
  });
};

const approveLeave = (req, res) => {
  const { leaveId, status } = req.body;

  updateLeaveStatus(leaveId, status, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error updating leave status' });
    res.json({ message: `Leave ${status} successfully` });
  });
};

module.exports = {
  applyForLeave,
  getLeaveHistory,
  approveLeave,
};
