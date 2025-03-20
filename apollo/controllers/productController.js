const models = require('../models');
const Product = models.Product;

exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.findByName = (req, res) => {
    Product.findByName(req.params.name, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error retrieving Products with name " + req.params.name
            });
        } else res.send(data);
    });
};

// routes/productRoutes.js
module.exports = app => {
    const products = require("../controllers/productController.js");

    // Retrieve all Products
    app.get("/api/products", products.findAll);

    // Retrieve a single Product with productId
    app.get("/api/products/:id", products.findOne);

    // Retrieve Products by name
    app.get("/api/products/name/:name", products.findByName);
};