const jwt = require('jsonwebtoken');

// 验证 JWT 令牌的中间件
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, `${process.env.JWT_SECRET}`, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        // 将解码后的令牌数据附加到请求对象上
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;