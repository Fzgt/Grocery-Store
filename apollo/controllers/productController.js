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

    placeOrder: (req, res) => {
        // validate request body
        if (!req.body || !req.body.cart || !Array.isArray(req.body.cart) || req.body.cart.length === 0) {
            return res.status(400).send({
                success: false,
                message: "Invalid request. Cart must be a non-empty array of items."
            });
        }

        // validate each item in the cart
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

        // check stock and update order function in model
        Product.checkAndUpdateStock(cart, (err, data) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: err.message || "An error occurred while processing your order."
                });
            }

            if (!data.success) {
                return res.status(409).send(data); // 409 Conflict - out of stock
            }

            res.status(200).send(data); // 200 OK - order placed successfully
        });
    }
};

module.exports = productController;