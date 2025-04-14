module.exports = app => {
    const products = require("../controllers/productController.js");

    app.get("/api/products", products.findAll);

    app.post("/api/order/place", products.placeOrder);
};