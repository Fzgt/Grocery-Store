const models = require('../models');

// 会员关系控制器
const membershipController = {
    // getAllMemberships: (req, res) => {
    //     models.Membership.getAllMemberships((err, memberships) => {
    //         if (err) return res.status(500).json({ error: err.message });
    //         res.json(memberships);
    //     });
    // },

    getMembershipById: async (req, res) => {
        try {
            const organizationId = req.params.organizationId;
            const memberList = await models.Membership.getMembershipById(organizationId);
            if (!memberList) return res.status(404).json({ error: 'This club has no member.' });
            const userIdList = memberList.map(item => item.UserID);

            const users = await models.User.getAllUsers();
            if (!users) return res.status(404).json({ error: 'This club has no member.' });
            const members = users.filter(item => userIdList.includes(item.UserID));
            console.log(members);

            res.json(members);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getUserOrganizations: async (req, res) => {
        try {
          console.log('getUserOrganizations called');
          const userId = req.params.userId;
          const memberships = await models.Membership.getMembershipsByUserId(userId);
          if (!memberships || memberships.length === 0) {
            return res.status(404).json({ error: 'No organizations found for this user.' });
          }
    
          const organizationIds = memberships.map(membership => membership.OrganizationID);
          res.json(organizationIds);
        } catch (err) {
          console.error('Error in getUserOrganizations:', err.message);
          res.status(500).json({ error: err.message });
        }
      },
    
    // user join organization
    createMembership: async (req, res) => {
        const { userId, role, organizationId } = req.body;

        // 验证请求体
        if (!userId || !role || !organizationId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const membership = await models.Membership.createMembership(userId, role, organizationId);
            res.status(201).json(membership);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // updateMembership: (req, res) => {
    //     models.Membership.updateMembership(req.params.id, req.body, (err, membership) => {
    //         if (err) return res.status(500).json({ error: err.message });
    //         if (!membership) return res.status(404).json({ error: 'Membership not found' });
    //         res.json(membership);
    //     });
    // },

    // deleteMembership: (req, res) => {
    //     models.Membership.deleteMembership(req.params.id, (err, affectedRows) => {
    //         if (err) return res.status(500).json({ error: err.message });
    //         if (affectedRows === 0) return res.status(404).json({ error: 'Membership not found' });
    //         res.json({ message: 'Membership deleted' });
    //     });
    // }
};

module.exports = membershipController