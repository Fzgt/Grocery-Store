const models = require('../models');

// 用户控制器
const userController = {
    // Get All Users
    getAllUsers: async (req, res) => {
        try {
            const users = await models.User.getAllUsers();
            if (!users) return res.status(404).json({ error: 'This club has no member.' });
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get /users/:id (get the user all info)
    getUserById: async (req, res) => {

        const getUserOrganizationInfo = async (userOrganizationIds) => {
            try {
                const promises = userOrganizationIds.map(organizationId => {
                    return Promise.all([
                        models.VolunteerOrganization.getOrganizationInfoByOrganizationId(organizationId),
                        models.VolunteerOrganization.getEventsByOrganizationId(organizationId),
                        models.VolunteerOrganization.getPostsByOrganizationId(organizationId)
                    ]);
                });

                const organizationInfosWithEventsAndPosts = await Promise.all(promises);

                const userOrganizationInfo = {};
                organizationInfosWithEventsAndPosts.forEach((result, index) => {
                    const [organizationInfo, events, posts] = result;
                    if (organizationInfo) {
                        userOrganizationInfo[userOrganizationIds[index]] = {
                            ...organizationInfo,
                            Events: events,
                            Posts: posts
                        };
                    }
                });
                return userOrganizationInfo;
            } catch (err) {
                throw err;
            }
        };

        try {
            const userId = req.params.userId;

            const userAll = {
                userInfo: undefined,
                userOrganizations: undefined
            };

            const userInfo = await models.User.getUserById(userId);
            if (!userInfo) {
                return res.status(404).json({ error: 'user not found' });
            }
            userAll.userInfo = userInfo;

            const userOrganizationIds = await models.VolunteerOrganization.getOrganizationsByUserId(userId);
            if (!userOrganizationIds) {
                return res.status(200).json({ message: 'the user have not joined any organization' });
            }

            const organizationInfos = await getUserOrganizationInfo(userOrganizationIds);
            console.log(organizationInfos);

            userAll.organizationInfos = organizationInfos;

            res.json(userAll);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // createUser: (req, res) => {
    //     models.User.createUser(req.body, (err, user) => {
    //         if (err) return res.status(500).json({ error: err.message });
    //         res.status(201).json(user);
    //     });
    // },


    updateUser: (req, res) => {
        models.User.updateUser(req.params.userId, req.body, (err, user) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.status(200).json({ message: 'Update success.' });
            // res.json(user);
        });
    },

    deleteUser: (req, res) => {
        models.User.deleteUser(req.params.userId, (err, affectedRows) => {
            if (err) return res.status(500).json({ error: err.message });
            if (affectedRows === 0) return res.status(404).json({ error: 'User not found' });
            res.json({ message: 'User deleted' });
        });
    }
};

module.exports = userController;