const models = require('../models');

const organizationController = {
    getAllOrganizations: (req, res) => {
        models.VolunteerOrganization.getAllOrganizations((err, organizations) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(organizations);
        });
    },

    getOrganizationById: (req, res) => {
        const organizationId = req.params.id;
        models.VolunteerOrganization.getOrganizationInfoByOrganizationId(organizationId)
            .then(organization => {
                if (!organization) return res.status(404).json({ error: 'Organization not found' });
                res.json(organization);
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    },

    createOrganization: (req, res) => {
        const { organizationName, description, adminUserId } = req.body;

        // Log the request body to debug
        console.log('Request Body:', req.body);

        // Validate request body
        if (!organizationName || !description || !adminUserId || isNaN(adminUserId)) {
            return res.status(400).json({ error: 'Missing required fields or invalid data type' });
        }

        models.VolunteerOrganization.createOrganization(organizationName, description, adminUserId, (err, organization) => {
            if (err) {
                console.error('Error creating organization:', err);
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(organization);
        });
    },

    updateOrganization: (req, res) => {
        const { organizationId, organizationName, description, adminUserId } = req.body;

        // Log the request body to debug
        console.log('Request Body:', req.body);

        // verify
        if (!organizationId || !organizationName || !description || !adminUserId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        models.VolunteerOrganization.updateOrganization({ organizationId, organizationName, description, adminUserId }, (err, organization) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!organization) return res.status(404).json({ error: 'Organization not found' });
            res.json(organization);
        });
    },
    
    deleteOrganization: (req, res) => {
        models.VolunteerOrganization.deleteOrganization(req.params.organizationId, (err, affectedRows) => {
            if (err) {
                console.error('Error deleting organization:', err);
                return res.status(500).json({ error: err.message });
            }
            if (affectedRows === 0) return res.status(404).json({ error: 'Organization not found' });
            res.json({ message: 'Organization deleted' });
        });
    }
};

module.exports = organizationController;
