-- Drops the favorite_db if it exists currently --
DROP DATABASE
IF EXISTS bamazon;

-- Creates the "favorite_db" database --
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT (10) AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR (50) NOT NULL,
department_name VARCHAR(30),
price DECIMAL (10,2) NOT NULL,
stock_quantity INT (10) NOT NULL
);

SELECT * FROM bamazon.products;