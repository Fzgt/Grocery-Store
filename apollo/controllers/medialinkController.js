const models = require('../models');

// 社交媒体链接控制器
const socialMediaLinkController = {
    getAllSocialMediaLinks: (req, res) => {
        models.SocialMediaLink.getAllSocialMediaLinks((err, links) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(links);
        });
    },

    getSocialMediaLinkById: (req, res) => {
        models.SocialMediaLink.getSocialMediaLinkById(req.params.id, (err, link) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!link) return res.status(404).json({ error: 'Social media link not found' });
            res.json(link);
        });
    },

    createSocialMediaLink: (req, res) => {
        models.SocialMediaLink.createSocialMediaLink(req.body, (err, link) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(link);
        });
    },

    updateSocialMediaLink: (req, res) => {
        models.SocialMediaLink.updateSocialMediaLink(req.params.id, req.body, (err, link) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!link) return res.status(404).json({ error: 'Social media link not found' });
            res.json(link);
        });
    },

    deleteSocialMediaLink: (req, res) => {
        models.SocialMediaLink.deleteSocialMediaLink(req.params.id, (err, affectedRows) => {
            if (err) return res.status(500).json({ error: err.message });
            if (affectedRows === 0) return res.status(404).json({ error: 'Social media link not found' });
            res.json({ message: 'Social media link deleted' });
        });
    }
};

module.exports = socialMediaLinkController