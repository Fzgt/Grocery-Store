const models = require('../models');

// RSVP控制器
const rsvpController = {
    // getAllRSVPs: (req, res) => {
    //     models.RSVP.getAllRSVPs((err, rsvps) => {
    //         if (err) return res.status(500).json({ error: err.message });
    //         res.json(rsvps);
    //     });
    // },

    getAllRSVPUsers: async (req, res) => {
        try {
            const eventId = req.params.eventId;
            const rsvpUsers = await models.RSVP.getAllRSVPUsers(eventId);

            res.json(rsvpUsers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getRSVPByUserId: async (req, res) => {
        try {
            const userId = req.params.userId;

            const rsvpList = await models.RSVP.getRSVPByUserId(userId);
            if (!rsvpList) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(rsvpList);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    createRSVP: (req, res) => {
        const { eventId, userId, rsvpStatus, rsvpDate } = req.body;

        if (!eventId || !userId || !rsvpStatus || !rsvpDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        models.RSVP.createRSVP(eventId, userId, rsvpStatus, rsvpDate, (err, rsvp) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(rsvp);
        });
    },

    // updateRSVP: (req, res) => {
    //     models.RSVP.updateRSVP(req.params.id, req.body, (err, rsvp) => {
    //         if (err) return res.status(500).json({ error: err.message });
    //         if (!rsvp) return res.status(404).json({ error: 'RSVP not found' });
    //         res.json(rsvp);
    //     });
    // },

    // deleteRSVP: (req, res) => {
    //     models.RSVP.deleteRSVP(req.params.id, (err, affectedRows) => {
    //         if (err) return res.status(500).json({ error: err.message });
    //         if (affectedRows === 0) return res.status(404).json({ error: 'RSVP not found' });
    //         res.json({ message: 'RSVP deleted' });
    //     });
    // }
};

module.exports = rsvpController;
