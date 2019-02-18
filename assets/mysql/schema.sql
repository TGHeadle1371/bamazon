DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INTEGER(10), 
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NULL,
	price INTEGER(100) NOT NULL,
	stock_quantity INTEGER(100) NOT NULL,
	PRIMARY KEY (item_id)
);


INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(1, "Laptop Case", "Office Supplies", 45, 15),
(2, "Fishing Rod", "Sporting Goods", 65, 5),
(3, "Dog Leash", "Sporting Goods", 15, 15),
(4, "Paper Towels", "Kitchen Supplies", 10, 500),
(5, "Plates", "Kitchen Supplies", 40, 8),
(6, "Fishing Bait", "Sporting Goods", 5, 25),
(11, "Placemats", "Kitchen Supplies", 6, 25),
(7, "Printer Cartridges", "Office Supplies", 45, 5),
(8, "Carrots", "Produce", 5, 5),
(9, "Apples", "Produce", 3, 50),
(10, "Broccoli", "Produce", 3.75, 12);


SELECT * FROM products;