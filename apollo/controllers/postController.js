const models = require('../models');


// 帖子控制器
const postController = {
    // getAllPosts: (req, res) => {
    //     models.Post.getAllPosts((err, posts) => {
    //         if (err) return res.status(500).json({ error: err.message });
    //         res.json(posts);
    //     });
    // },

    getPostById: async (req, res) => {
        try {
            const organizationId = req.params.organizationId;
            const posts = await models.Post.getPostById(organizationId);
            if (!posts) return res.status(404).json({ error: 'Post not found' });
            res.json(posts);

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }

    },

    createPost: (req, res) => {
        const { organizationId, postedByUserId, content, visibility, postDate } = req.body;

        // 验证请求体
        if (!organizationId || !postedByUserId || !content || !visibility || !postDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        models.Post.createPost(organizationId, postedByUserId, content, visibility, postDate, (err, post) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(post);
        });
    },

    updatePost: (req, res) => {
        const { postId, organizationId, content, visibility, postDate } = req.body;

        if (!postId || !organizationId || !content || !visibility || !postDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        models.Post.updatePost(postId, organizationId, content, visibility, postDate, (err, post) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!post) return res.status(404).json({ error: 'Post not found' });
            res.json(post);
        });
    },

    deletePost: async (req, res) => {
        try {
            const postId = req.params.postId;
            const affectedRows = await models.Post.deletePost(postId);

            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Post not found' });
            }

            res.json({ message: 'Post deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = postController;