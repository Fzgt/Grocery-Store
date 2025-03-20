const pool = require('./pool');

// 社交媒体链接模型
const SocialMediaLink = {
    getAllSocialMediaLinks: (callback) => {
        pool.query('SELECT * FROM SocialMediaLinks', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getSocialMediaLinkById: (id, callback) => {
        pool.query('SELECT * FROM SocialMediaLinks WHERE LinkID = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    createSocialMediaLink: (data, callback) => {
        pool.query('INSERT INTO SocialMediaLinks SET ?', data, (err, results) => {
            if (err) return callback(err);
            callback(null, { id: results.insertId, ...data });
        });
    },

    updateSocialMediaLink: (id, data, callback) => {
        pool.query('UPDATE SocialMediaLinks SET ? WHERE LinkID = ?', [data, id], (err, results) => {
            if (err) return callback(err);
            callback(null, { id, ...data });
        });
    },

    deleteSocialMediaLink: (id, callback) => {
        pool.query('DELETE FROM SocialMediaLinks WHERE LinkID = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results.affectedRows);
        });
    }
};

module.exports = SocialMediaLink;