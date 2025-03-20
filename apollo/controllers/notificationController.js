const models = require('../models');

// 通知控制器
const notificationController = {
    getAllNotifications: (req, res) => {
        models.Notification.getAllNotifications((err, notifications) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(notifications);
        });
    },

    getNotificationById: (req, res) => {
        models.Notification.getNotificationById(req.params.id, (err, notification) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!notification) return res.status(404).json({ error: 'Notification not found' });
            res.json(notification);
        });
    },

    createNotification: (req, res) => {
        models.Notification.createNotification(req.body, (err, notification) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(notification);
        });
    },

    updateNotification: (req, res) => {
        models.Notification.updateNotification(req.params.id, req.body, (err, notification) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!notification) return res.status(404).json({ error: 'Notification not found' });
            res.json(notification);
        });
    },

    deleteNotification: (req, res) => {
        models.Notification.deleteNotification(req.params.id, (err, affectedRows) => {
            if (err) return res.status(500).json({ error: err.message });
            if (affectedRows === 0) return res.status(404).json({ error: 'Notification not found' });
            res.json({ message: 'Notification deleted' });
        });
    }
};

module.exports = notificationController;