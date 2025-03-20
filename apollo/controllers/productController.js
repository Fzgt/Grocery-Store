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

    findOne: (req, res) => {
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
    },

    findByName: (req, res) => {
        Product.findByName(req.params.name, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error retrieving Products with name " + req.params.name
                });
            } else res.send(data);
        });
    }
};

module.exports = productController;