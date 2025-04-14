const pool = require('./pool');

class Product {
    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.unit = product.unit;
        this.image = product.image;
        this.stock = product.stock;
        this.category = product.category;
        this.description = product.description;
    }

    static getAll(result) {
        pool.query("SELECT * FROM products", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, res);
        });
    }

    static checkAndUpdateStock(cart, result) {
        // begin transaction
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Database connection error: ", err);
                result(err, null);
                return;
            }

            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    console.log("Transaction begin error: ", err);
                    result(err, null);
                    return;
                }

                const insufficientStock = [];
                // check stock for each product in the cart
                const checkStockPromises = cart.map(item => {
                    return new Promise((resolve, reject) => {
                        connection.query(
                            "SELECT id, name, stock FROM products WHERE id = ?",
                            [item.id],
                            (err, res) => {
                                if (err) {
                                    return reject(err);
                                }

                                if (res.length === 0) {
                                    return reject(new Error(`Product with ID ${item.id} not found`));
                                }

                                const product = res[0];
                                if (product.stock < item.quantity) {
                                    insufficientStock.push({
                                        id: product.id,
                                        name: product.name,
                                        requested: item.quantity,
                                        available: product.stock
                                    });
                                }
                                resolve();
                            }
                        );
                    });
                });

                // stock check
                Promise.all(checkStockPromises)
                    .then(() => {
                        // if exists insufficient stock, rollback the transaction
                        if (insufficientStock.length > 0) {
                            connection.rollback(() => {
                                connection.release();
                                result(null, {
                                    success: false,
                                    message: "Insufficient stock for some products",
                                    insufficientStock
                                });
                            });
                            return;
                        }
                        // if all in stock, update the stock
                        const updatePromises = cart.map(item => {
                            return new Promise((resolve, reject) => {
                                connection.query(
                                    "UPDATE products SET stock = stock - ? WHERE id = ?",
                                    [item.quantity, item.id],
                                    (err, res) => {
                                        if (err) {
                                            return reject(err);
                                        }
                                        resolve();
                                    }
                                );
                            });
                        });

                        Promise.all(updatePromises)
                            .then(() => {
                                connection.commit(err => {
                                    if (err) {
                                        connection.rollback(() => {
                                            connection.release();
                                            console.log("Transaction commit error: ", err);
                                            result(err, null);
                                        });
                                        return;
                                    }

                                    connection.release();
                                    result(null, {
                                        success: true,
                                        message: "Order placed successfully, stock updated"
                                    });
                                });
                            })
                            .catch(err => {
                                connection.rollback(() => {
                                    connection.release();
                                    console.log("Stock update error: ", err);
                                    result(err, null);
                                });
                            });
                    })
                    .catch(err => {
                        connection.rollback(() => {
                            connection.release();
                            console.log("Stock check error: ", err);
                            result(err, null);
                        });
                    });
            });
        });
    }
}

module.exports = Product;