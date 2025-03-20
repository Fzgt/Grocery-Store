const pool = require('./pool');

// 通知模型
const Notification = {
    getAllNotifications: (callback) => {
        pool.query('SELECT * FROM Notifications', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getNotificationById: (id, callback) => {
        pool.query('SELECT * FROM Notifications WHERE NotificationID = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    createNotification: (data, callback) => {
        pool.query('INSERT INTO Notifications SET ?', data, (err, results) => {
            if (err) return callback(err);
            callback(null, { id: results.insertId, ...data });
        });
    },

    updateNotification: (id, data, callback) => {
        pool.query('UPDATE Notifications SET ? WHERE NotificationID = ?', [data, id], (err, results) => {
            if (err) return callback(err);
            callback(null, { id, ...data });
        });
    },

    deleteNotification: (id, callback) => {
        pool.query('DELETE FROM Notifications WHERE NotificationID = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results.affectedRows);
        });
    }
};

module.exports = Notification;