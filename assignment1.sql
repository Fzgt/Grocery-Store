/*
 Navicat Premium Data Transfer

 Source Server         : Fzgt
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : assignment1

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 15/04/2025 00:43:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `image` varchar(10) NOT NULL,
  `stock` int NOT NULL,
  `category` varchar(20) NOT NULL,
  `subcategory` varchar(30) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_products_category` (`category`),
  KEY `idx_products_subcategory` (`subcategory`),
  KEY `idx_products_price` (`price`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of products
-- ----------------------------
BEGIN;
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (1, 'New Zealand Apple', 12.90, '500g', '🍎', 78, 'fruits', 'fruits-local', 'fruits healthy new zealand apple seasonal nutritious local organic');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (2, 'Thai Banana', 6.50, 'bunch', '🍌', 62, 'fruits', 'fruits-imported', 'fruits thai banana farm delicious healthy local sweet');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (3, 'Dragon Fruit', 15.80, 'piece', '🐉', 8, 'fruits', 'fruits-imported', 'ripe vitamin fruits tropical dragon fruit sweet fresh');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (4, 'Blueberries', 28.90, 'box', '🫐', 45, 'fruits', 'fruits-berries', 'fruits blueberries delicious ripe nutritious imported');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (5, 'Organic Broccoli', 8.80, '250g', '🥦', 37, 'vegetables', 'vegetables-exotic', 'vegetables seasonal crisp organic broccoli vitamin green organic');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (6, 'Carrots', 3.50, '500g', '🥕', 50, 'vegetables', 'vegetables-root', 'organic crisp fresh carrots garden vegetables');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (7, 'Cherry Tomatoes', 9.90, 'box', '🍅', 46, 'vegetables', 'vegetables-regular', 'vegetables green cherry tomatoes organic roasted farm');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (8, 'Cucumber', 4.80, 'piece', '🥒', 16, 'vegetables', 'vegetables-regular', 'salad vegetables raw crisp cucumber nutritious fresh');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (9, 'Plain Yogurt', 13.80, '500ml', '🥛', 33, 'dairy', 'dairy-yogurt', 'dairy plain yogurt rich organic calcium');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (10, 'Cheddar Cheese', 25.90, '200g', '🧀', 17, 'dairy', 'dairy-cheese', 'natural farm creamy processed unsalted cheddar cheese dairy');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (11, 'Organic Milk', 19.80, '1L', '🥛', 21, 'dairy', 'dairy-milk', 'organic milk organic cultured rich dairy artisanal');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (12, 'Butter', 18.50, '100g', '🧈', 37, 'dairy', 'dairy-butter', 'rich protein fermented dairy farm butter artisanal');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (13, 'Whole Wheat Bread', 12.80, 'loaf', '🍞', 40, 'bakery', 'bakery-bread', 'bakery warm sweet whole wheat bread grain crispy');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (14, 'Croissant', 8.90, 'piece', '🥐', 33, 'bakery', 'bakery-pastry', 'bakery fresh croissant yeast crispy wheat warm');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (15, 'Chocolate Muffin', 4.50, 'piece', '🧁', 26, 'bakery', 'bakery-sweet', 'breakfast artisanal butter homemade soft chocolate muffin bakery');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (16, 'Bagel', 3.50, 'piece', '🥯', 34, 'bakery', 'bakery-specialty', 'handmade bagel bakery baked soft');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (17, 'Chicken Breast', 24.90, '500g', '🍗', 11, 'meat', 'meat-poultry', 'meat chicken breast protein roasted farm');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (18, 'Ground Beef', 18.50, '250g', '🥩', 16, 'meat', 'meat-beef', 'farm protein natural fresh ground beef meat');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (19, 'Bacon', 11.90, 'pack', '🥓', 21, 'meat', 'meat-pork', 'grilled meat tender bacon marinated');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (20, 'Salmon Fillet', 32.90, '200g', '🐟', 8, 'meat', 'meat-seafood', 'boneless salmon fillet roasted protein juicy meat grilled');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (21, 'Watermelon', 8.50, 'kg', '🍉', 16, 'fruits', 'fruits-local', 'vitamin local organic fruits watermelon');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (22, 'Peach', 4.90, 'piece', '🍑', 50, 'fruits', 'fruits-local', 'peach delicious seasonal fruits fresh');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (23, 'Strawberries', 7.90, 'box', '🍓', 5, 'fruits', 'fruits-berries', 'fruits strawberries natural healthy nutritious juicy');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (24, 'Oranges', 3.50, '4 pack', '🍊', 31, 'fruits', 'fruits-citrus', 'imported nutritious healthy natural oranges fruits');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (25, 'Lemon', 1.50, 'piece', '🍋', 6, 'fruits', 'fruits-citrus', 'fruits lemon tropical farm sweet');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (26, 'Green Apple', 11.90, '500g', '🍏', 8, 'fruits', 'fruits-local', 'fruits local tropical green apple seasonal');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (27, 'Bell Pepper', 2.50, 'piece', '🫑', 50, 'vegetables', 'vegetables-regular', 'nutritious salad crisp vegetables raw bell pepper');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (28, 'Potato', 5.90, 'kg', '🥔', 29, 'vegetables', 'vegetables-root', 'vegetables potato seasonal roasted local');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (29, 'Spinach', 3.90, 'bunch', '🥬', 31, 'vegetables', 'vegetables-leafy', 'fresh spinach vegetables salad healthy nutritious');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (30, 'Mushrooms', 6.50, '250g', '🍄', 32, 'vegetables', 'vegetables-regular', 'vegetables mushrooms crisp healthy salad vitamin organic');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (31, 'Garlic', 2.90, 'bulb', '🧄', 31, 'vegetables', 'vegetables-regular', 'vegetables garlic vitamin nutritious crisp garden seasonal');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (32, 'Onion', 1.90, 'piece', '🧅', 39, 'vegetables', 'vegetables-regular', 'vegetables green onion raw farm vitamin');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (33, 'Greek Yogurt', 15.80, '500ml', '🥛', 30, 'dairy', 'dairy-yogurt', 'fresh greek yogurt dairy natural organic');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (34, 'Mozzarella', 22.90, '200g', '🧀', 7, 'dairy', 'dairy-cheese', 'artisanal natural pasteurized mozzarella organic farm dairy');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (35, 'Cream Cheese', 13.50, '200g', '🧀', 48, 'dairy', 'dairy-cheese', 'dairy rich farm protein fresh cream cheese');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (36, 'Sour Cream', 9.90, '250ml', '🥛', 49, 'dairy', 'dairy-butter', 'sour cream protein fresh fermented artisanal dairy creamy');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (37, 'Cinnamon Roll', 5.50, 'piece', '🧁', 29, 'bakery', 'bakery-sweet', 'bakery warm baked breakfast cinnamon roll artisanal wheat');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (38, 'Sourdough Bread', 14.90, 'loaf', '🍞', 6, 'bakery', 'bakery-bread', 'artisanal crispy sourdough bread bakery flour butter warm');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (39, 'Baguette', 7.90, 'piece', '🥖', 12, 'bakery', 'bakery-bread', 'artisanal breakfast crispy bakery baked baguette flour');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (40, 'Pretzel', 4.20, 'piece', '🥨', 11, 'bakery', 'bakery-pastry', 'flour pretzel crispy wheat bakery artisanal');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (41, 'Sausage', 15.90, 'pack', '🌭', 6, 'meat', 'meat-pork', 'meat premium farm cut grilled sausage fresh');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (42, 'Lamb Chops', 28.90, '400g', '🍖', 24, 'meat', 'meat-specialty', 'fresh lamb chops tender meat organic');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (43, 'Pork Ribs', 21.90, '500g', '🍖', 15, 'meat', 'meat-pork', 'natural meat organic pork ribs juicy');
INSERT INTO `products` (`id`, `name`, `price`, `unit`, `image`, `stock`, `category`, `subcategory`, `description`) VALUES (44, 'Shrimp', 26.90, '250g', '🦐', 17, 'meat', 'meat-seafood', 'meat shrimp juicy natural tender organic protein');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
