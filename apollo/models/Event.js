const pool = require('./pool');

// 活动模型
const Event = {
    // getAllEvents: (callback) => {
    //     pool.query('SELECT * FROM Events', (err, results) => {
    //         if (err) return callback(err);
    //         callback(null, results);
    //     });
    // },

    getEventById: (id) => {
        return new Promise((resolve, reject) => {
          console.log(`Fetching events for organization ID: ${id}`);
          pool.query('SELECT * FROM Events WHERE OrganizationID = ?', [id], (err, results) => {
            if (err) {
              console.error('Database error:', err);
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      },

    createEvent: (organizationId, title, description, eventDate, callback) => {
        const data = {
            OrganizationID: organizationId,
            Title: title,
            Description: description,
            EventDate: eventDate,
        };

        pool.query('INSERT INTO Events SET ?', data, (err, results) => {
            if (err) return callback(err);
            const event = {
                id: results.insertId,
                ...data
            };
            callback(null, event);
        });
    },

    updateEvent: (evenId, organizationId, title, description, eventDate, callback) => {
        const data = {
            OrganizationID: organizationId,
            Title: title,
            Description: description,
            EventDate: eventDate,
        };

        pool.query('UPDATE Events SET ? WHERE EventID = ?', [data, evenId], (err, results) => {
            if (err) return callback(err);
            if (results.affectedRows === 0) {
                return callback(null, null); // 如果没有找到对应的 Event,返回 null
            }
            const event = {
                EventID: evenId,
                ...data
            };
            callback(null, event);
        });
    },

    deleteEvent: id => {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM Events WHERE EventID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.affectedRows);
                }
            });
        });
    }
};

module.exports = Event