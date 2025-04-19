const { db } = require('../config/db');

const sendNotification = (message, sentTo, callback) => {
  db.query(
    'INSERT INTO Notifications (Message, SentTo, DateSent) VALUES (?, ?, NOW())',
    [message, sentTo],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

const getNotificationsForEmployee = (employeeId, callback) => {
  db.query(
    'SELECT * FROM Notifications WHERE SentTo = ? OR SentTo = "All" ORDER BY DateSent DESC LIMIT 50',
    [employeeId],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

module.exports = {
  sendNotification,
  getNotificationsForEmployee,
};
