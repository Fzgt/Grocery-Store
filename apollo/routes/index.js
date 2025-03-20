module.exports = app => {
    const products = require("../controllers/productController.js");

    app.get("/api/products", products.findAll);
    app.get("/api/products/name/:name", products.findByName);
    app.get("/api/products/:id", products.findOne);
};