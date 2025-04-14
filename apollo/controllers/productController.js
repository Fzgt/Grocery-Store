const Product = require('../models/product.js');

const productController = {
    findAll: (req, res) => {
        Product.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving products."
                });
            else res.send(data);
        });
    },

    // 处理订单并更新库存
    placeOrder: (req, res) => {
        // 验证请求体
        if (!req.body || !req.body.cart || !Array.isArray(req.body.cart) || req.body.cart.length === 0) {
            return res.status(400).send({
                success: false,
                message: "Invalid request. Cart must be a non-empty array of items."
            });
        }

        // 验证购物车中的每个商品
        const cart = req.body.cart;
        const isValidCart = cart.every(item => 
            item && 
            item.id && 
            typeof item.quantity === 'number' && 
            item.quantity > 0
        );

        if (!isValidCart) {
            return res.status(400).send({
                success: false,
                message: "Invalid cart data. Each item must have id and quantity > 0."
            });
        }

        // 调用模型方法检查并更新库存
        Product.checkAndUpdateStock(cart, (err, data) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: err.message || "An error occurred while processing your order."
                });
            }

            // 根据库存检查结果返回相应状态码
            if (!data.success) {
                return res.status(409).send(data); // 409 Conflict - 库存不足
            }

            res.status(200).send(data); // 200 OK - 订单成功
        });
    }
};

module.exports = productController;