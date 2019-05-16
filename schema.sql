DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NULL,
  price decimal(10,2) NULL,
  stock_quantity INT(100) NULL,
  primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple MacBook Pro", "computers", 2299.99, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mrs. Meyer's Hand Soap", "kitchen and bath", 6.99, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iRobot Roomba", "household", 250.00, 180);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LG OLED TV 65 inch", "electronics", 1999.99, 70);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lysol Wipes", "kitchen and bath", 7.50, 430);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Magic Mouse", "computers", 79.99, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sony PS4 Pro 1TB", "electronics", 399.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Netgear Orbi Mesh Router", "computers", 279.59, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("West Elm Planter", "household", 150.00, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Head and Shoulders Shampoo", "kitchen and bath", 9.80, 860);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Instant Pot 6qt", "kitchen and bath", 80.00, 370);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bamazon Choice Area Rug 12x10", "household", 119.99, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "electronics", 299.99, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Zojirushi Rice Cooker", "kitchen and bath", 149.99, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dell 32inch Monitor", "computers", 250.00, 2);

select * from products;

