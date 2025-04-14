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

            result(null, res);
        });
    }

    // 检查库存并更新库存方法
    static checkAndUpdateStock(cart, result) {
        // 首先创建事务以确保操作的原子性
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

                // 存储库存不足的商品信息
                const insufficientStock = [];
                // 检查每个商品的库存
                const checkStockPromises = cart.map(item => {
                    return new Promise((resolve, reject) => {
                        connection.query(
                            "SELECT product_id, product_name, in_stock FROM products WHERE product_id = ?",
                            [item.id],
                            (err, res) => {
                                if (err) {
                                    return reject(err);
                                }
                                
                                if (res.length === 0) {
                                    return reject(new Error(`Product with ID ${item.id} not found`));
                                }
                                
                                const product = res[0];
                                if (product.in_stock < item.quantity) {
                                    insufficientStock.push({
                                        id: product.product_id,
                                        name: product.product_name,
                                        requested: item.quantity,
                                        available: product.in_stock
                                    });
                                }
                                resolve();
                            }
                        );
                    });
                });

                // 执行所有库存检查
                Promise.all(checkStockPromises)
                    .then(() => {
                        // 如果存在库存不足的商品，则回滚事务并返回错误
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

                        // 所有商品库存充足，开始更新库存
                        const updatePromises = cart.map(item => {
                            return new Promise((resolve, reject) => {
                                connection.query(
                                    "UPDATE products SET in_stock = in_stock - ? WHERE product_id = ?",
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

                        // 执行所有库存更新
                        Promise.all(updatePromises)
                            .then(() => {
                                // 提交事务
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