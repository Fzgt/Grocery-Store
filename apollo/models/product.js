const pool = require('./pool');

class Product {
    constructor(product) {
        this.product_id = product.product_id;
        this.product_name = product.product_name;
        this.unit_price = product.unit_price;
        this.unit_quantity = product.unit_quantity;
        this.in_stock = product.in_stock;
    }

    static getAll(result) {
        pool.query("SELECT * FROM products", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("products: ", res);
            result(null, res);
        });
    }

    static findById(productId, result) {
        pool.query(`SELECT * FROM products WHERE product_id = ${productId}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found product: ", res[0]);
                result(null, res[0]);
                return;
            }

            // Not found
            result({ kind: "not_found" }, null);
        });
    }

    static findByName(productName, result) {
        pool.query(`SELECT * FROM products WHERE product_name = ?`, [productName], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("found products: ", res);
            result(null, res);
        });
    }
}

module.exports = Product;