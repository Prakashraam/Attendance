const { getAllShifts, assignShiftToEmployee } = require('../models/Shift');

const getShifts = (req, res) => {
  getAllShifts((err, result) => {
    if (err) return res.status(500).json({ error: 'Error fetching shifts' });
    res.json(result);
  });
};

const assignShift = (req, res) => {
  const { employeeId, shiftId } = req.body;

  assignShiftToEmployee(employeeId, shiftId, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error assigning shift' });
    res.json({ message: 'Shift assigned successfully' });
  });
};

module.exports = {
  getShifts,
  assignShift,
};
