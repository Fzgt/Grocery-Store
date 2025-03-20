const models = require('../models');

// 活动控制器
const eventController = {
    getEventById: async (req, res) => {
        try {
            const organizationId = req.params.organizationId;
            const events = await models.Event.getEventById(organizationId);
            if (!events) return res.status(404).json({ error: 'Event not found' });
            res.json(events);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    

    createEvent: (req, res) => {
        const { organizationId, title, description, eventDate } = req.body;

        if (!organizationId || !title || !description || !eventDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        models.Event.createEvent(organizationId, title, description, eventDate, (err, event) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(event);
        });
    },

    updateEvent: (req, res) => {
        const { eventId, organizationId, title, description, eventDate } = req.body;

        if (!eventId || !organizationId || !title || !description || !eventDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        models.Event.updateEvent(eventId, organizationId, title, description, eventDate, (err, event) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!event) return res.status(404).json({ error: 'Event not found' });
            res.json(event);
        });
    },

    deleteEvent: async (req, res) => {
        try {
            const eventId = req.params.eventId;
            const affectedRows = await models.Event.deleteEvent(eventId);

            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Event not found' });
            }

            res.json({ message: 'Event deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = eventController;
