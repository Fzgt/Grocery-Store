const pool = require('./pool');

// 会员关系模型
const Membership = {
    // getAllMemberships: (callback) => {
    //     pool.query('SELECT * FROM Memberships', (err, results) => {
    //         if (err) return callback(err);
    //         callback(null, results);
    //     });
    // },

    getMembershipsByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM Memberships WHERE UserID = ?', [userId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },


    getMembershipById: (organizationId) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM Memberships WHERE OrganizationID = ?', [organizationId], (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    },    

    createMembership: (userId, role, organizationId) => {
        return new Promise((resolve, reject) => {
            const data = {
                UserID: userId,
                Role: role,
                OrganizationID: organizationId
            };

            pool.query('INSERT INTO Memberships SET ?', data, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const membership = {
                        id: results.insertId,
                        ...data
                    };
                    resolve(membership);
                }
            });
        });
    },

    // updateMembership: (id, data, callback) => {
    //     pool.query('UPDATE Memberships SET ? WHERE MembershipID = ?', [data, id], (err, results) => {
    //         if (err) return callback(err);
    //         callback(null, { id, ...data });
    //     });
    // },

    // deleteMembership: (id, callback) => {
    //     pool.query('DELETE FROM Memberships WHERE MembershipID = ?', [id], (err, results) => {
    //         if (err) return callback(err);
    //         callback(null, results.affectedRows);
    //     });
    // }
};

module.exports = Membership;