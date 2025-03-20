const pool = require('./pool');

// 志愿者组织模型
const VolunteerOrganization = {

    getOrganizationsByUserId: (id) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT OrganizationID FROM Memberships WHERE UserID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const organizationIds = results.map(result => result.OrganizationID);
                    resolve(organizationIds);
                }
            });
        });
    },

    getOrganizationInfoByOrganizationId: (organizationId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM VolunteerOrganizations WHERE OrganizationID = ?';
            pool.query(query, [organizationId], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length === 0) {
                    resolve(null); // 如果没有找到组织,返回 null
                } else {
                    resolve(results[0]);
                }
            });
        });
    },

    getEventsByOrganizationId: (organizationId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Events WHERE OrganizationID = ?';
            pool.query(query, [organizationId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    getPostsByOrganizationId: (organizationId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Posts WHERE OrganizationID = ?';
            pool.query(query, [organizationId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },


    getAllOrganizations: (callback) => {
        pool.query('SELECT * FROM VolunteerOrganizations', (err, results) => {
            if (err) {
                console.error('Error fetching organizations:', err);
                return callback(err);
            }
            callback(null, results);
        });
    },

    createOrganization: (organizationName, description, adminUserId, callback) => {
        const data = {
            OrganizationName: organizationName,
            Description: description,
            AdminUserID: adminUserId
        };

        pool.query('INSERT INTO VolunteerOrganizations SET ?', data, (err, results) => {
            if (err) {
                console.error('Error creating organization:', err);
                return callback(err);
            }
            const organization = {
                OrganizationID: results.insertId,
                ...data
            };
            callback(null, organization);
        });
    },

    updateOrganization: (data, callback) => {
        const { organizationId, organizationName, description, adminUserId } = data;

        const updateData = {
            OrganizationName: organizationName,
            Description: description,
            AdminUserID: adminUserId
        };

        pool.query('UPDATE VolunteerOrganizations SET ? WHERE OrganizationID = ?', [updateData, organizationId], (err, results) => {
            if (err) {
                console.error('Error updating organization:', err);
                return callback(err);
            }
            if (results.affectedRows === 0) {
                return callback(null, null); // 如果没有找到对应的 Organization,返回 null
            }
            const organization = {
                OrganizationID: organizationId,
                ...updateData
            };
            callback(null, organization);
        });
    },

    deleteOrganization: (id, callback) => {
        pool.query('DELETE FROM VolunteerOrganizations WHERE OrganizationID = ?', [id], (err, results) => {
            if (err) {
                console.error('Error deleting organization:', err);
                return callback(err);
            }
            callback(null, results.affectedRows);
        });
    }
};

module.exports = VolunteerOrganization;