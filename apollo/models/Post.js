const pool = require('./pool');


// 帖子模型
const Post = {
    // getAllPosts: (callback) => {
    //     pool.query('SELECT * FROM Posts', (err, results) => {
    //         if (err) return callback(err);
    //         callback(null, results);
    //     });
    // },

    getPostById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM Posts WHERE OrganizationID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    createPost: (organizationId, postedByUserId, content, visibility, postDate, callback) => {
        const data = {
            OrganizationID: organizationId,
            PostedByUserID: postedByUserId,
            Content: content,
            Visibility: visibility,
            PostDate: postDate
        };

        pool.query('INSERT INTO Posts SET ?', data, (err, results) => {
            if (err) return callback(err);
            const post = {
                id: results.insertId,
                ...data
            };
            callback(null, post);
        });
    },

    updatePost: (postId, organizationId, content, visibility, postDate, callback) => {
        const data = {
            OrganizationID: organizationId,
            Content: content,
            Visibility: visibility,
            PostDate: postDate
        };

        pool.query('UPDATE Posts SET ? WHERE PostID = ?', [data, postId], (err, results) => {
            if (err) return callback(err);
            if (results.affectedRows === 0) {
                return callback(null, null); // 如果没有找到对应的 Post,返回 null
            }
            const post = {
                PostID: postId,
                ...data
            };
            callback(null, post);
        });
    },

    deletePost: id => {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM Posts WHERE PostID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.affectedRows);
                }
            });
        });
    }
};

module.exports = Post;