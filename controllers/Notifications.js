const { sendNotification, getNotificationsForEmployee } = require('../models/Notification');

const createNotification = (req, res) => {
  const { message, sentTo } = req.body;

  sendNotification(message, sentTo, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error sending notification' });
    res.status(201).json({ message: 'Notification sent successfully' });
  });
};

const getNotifications = (req, res) => {
  const { employeeId } = req.query;

  getNotificationsForEmployee(employeeId, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error fetching notifications' });
    res.json(result);
  });
};

module.exports = {
  createNotification,
  getNotifications,
};
