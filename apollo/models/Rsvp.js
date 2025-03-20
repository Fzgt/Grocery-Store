const pool = require('./pool');

// RSVP模型
const RSVP = {
    // getAllRSVPs: (callback) => {
    //     pool.query('SELECT * FROM RSVPs', (err, results) => {
    //         if (err) return callback(err);
    //         callback(null, results);
    //     });
    // },

    getAllRSVPUsers: eventId => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT r.RSVPID, r.UserID, r.RSVPStatus, r.RSVPDate, u.Username
                FROM RSVPs r
                JOIN Users u ON r.UserID = u.UserID
                WHERE r.EventID = ? AND r.RSVPStatus = 'Yes'
            `;

            pool.query(query, [eventId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    getRSVPByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM RSVPs WHERE UserID = ?', [userId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    createRSVP: (eventId, userId, rsvpStatus, rsvpDate, callback) => {
        const data = {
            EventID: eventId,
            UserID: userId,
            RSVPStatus: rsvpStatus,
            RSVPDate: rsvpDate
        };

        pool.query('INSERT INTO RSVPs SET ?', data, (err, results) => {
            if (err) return callback(err);
            const rsvp = {
                id: results.insertId,
                ...data
            };
            callback(null, rsvp);
        });
    },

    // updateRSVP: (id, data, callback) => {
    //     pool.query('UPDATE RSVPs SET ? WHERE RSVPID = ?', [data, id], (err, results) => {
    //         if (err) return callback(err);
    //         callback(null, { id, ...data });
    //     });
    // },

    // deleteRSVP: (id, callback) => {
    //     pool.query('DELETE FROM RSVPs WHERE RSVPID = ?', [id], (err, results) => {
    //         if (err) return callback(err);
    //         callback(null, results.affectedRows);
    //     });
    // }
};

module.exports = RSVP;
