const pool = require('./pool');

// 用户模型
const User = {
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM Users', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM Users WHERE UserID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length === 0) {
                    resolve(null); // 如果没有找到用户,返回 null
                } else {
                    resolve(results[0]);
                }
            });
        });
    },

    getUserByUsername: (username) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM Users WHERE Username = ?', [username], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length === 0) {
                    resolve(null); // 如果没有找到用户,返回 null
                } else {
                    resolve(results[0]);
                }
            });
        });
    },

    
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM Users WHERE Email = ?', [email], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length === 0) {
                    resolve(null); // 如果没有找到用户,返回 null
                } else {
                    resolve(results[0]);
                }
            });
        });
    },

    create: (data) => {
        return new Promise((resolve, reject) => {
            const keys = Object.keys(data);
            const values = Object.values(data);
            const placeholders = keys.map(() => '?').join(', ');
            const query = `INSERT INTO Users (${keys.join(', ')}) VALUES (${placeholders})`;

            pool.query(query, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const newData = { id: results.insertId, ...data };
                    resolve(newData);
                }
            });
        });
    },

    // udpate userInfo
    updateUser: (id, data, callback) => {
        console.log(id, data, '#####################');
        const keys = Object.keys(data);
        const values = Object.values(data);
        const setClause = keys.map(key => `${key} = ?`).join(', ');
        const query = `UPDATE Users SET ${setClause} WHERE UserID = ?`;
        const params = [...values, id];

        pool.query(query, params, (err, results) => {
            if (err) return callback(err);
            console.log(query, params, results);
            callback(null, { id, ...data });
        });
    },

    deleteUser: (id, callback) => {
        pool.query('DELETE FROM Users WHERE UserID = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results.affectedRows);
        });
    }
};

module.exports = User