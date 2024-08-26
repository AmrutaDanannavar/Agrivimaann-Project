create database agrivimaan;

use agrivimaan;

create table requests (id int auto_increment primary key,
                       name varchar(200),
                       email varchar(250),
                       phone varchar(250),
                       message text,
                       detailsfor varchar(250));
                       
select * from requests;                       
                       
CREATE TABLE book_now (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    drone_model VARCHAR(50) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    duration INT NOT NULL,
    location varchar(250) NOT NULL);
    
select * from book_now;    

create  table  admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from admins;

create  table pilots (
    pilot_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from pilots;



CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    pilot_id INT NOT NULL,
    service_id  VARCHAR(255) NOT NULL,
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    due_date DATE,
    FOREIGN KEY (pilot_id) REFERENCES pilots(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES drone_spraying_services (id) ON DELETE CASCADE
);

drop table tasks;

select * from tasks;


CREATE TABLE drone_parts (
    part_id INT AUTO_INCREMENT PRIMARY KEY,
    part_name VARCHAR(100) NOT NULL,
    part_type VARCHAR(50) NOT NULL,
    stock_quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,   
    image_path VARCHAR(255)
    
);

select * from drone_parts;


CREATE TABLE drone_spraying_services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    description TEXT,
    area_covered DECIMAL(10, 2) NOT NULL,
    price DECIMAL(10, 2) NOT NULL, 
    filled_type VARCHAR(100), 
    duration VARCHAR(100)
);
INSERT INTO drone_spraying_services (service_name, description, area_covered, price, filled_type, duration)
VALUES ('Crop Protection Service', 'A comprehensive crop protection service using organic pesticides.', 50.00, 1200.00, 'Liquid', '3 hours');

INSERT INTO drone_spraying_services (service_name, description, area_covered, price, filled_type, duration)
VALUES 
('Weed Control Service', 'Efficient weed control using environmentally safe herbicides.', 40.00, 1000.00, 'Liquid', '2 hours'),
('Fertilizer Application', 'Precision application of fertilizers to boost crop yield.', 60.00, 1500.00, 'Granular', '4 hours'),
('Pest Control Service', 'Targeted pest control using advanced insecticides.', 45.00, 1300.00, 'Liquid', '3 hours and 30 minutes');


INSERT INTO drone_spraying_services (service_name, description, area_covered, price, filled_type, duration)
VALUES 
('Nutrient Spraying', 'Balanced nutrient spraying for optimal plant health.', 50.00, 12000.00, 'Liquid', '2 hours and 15 minutes'),
('Seed Coating', 'Application of seed coating for better germination.', 30.00, 2800.00, 'Granular', '1 hour 30 minutes'),
('Fungicide Treatment', 'Effective fungicide treatment to combat plant diseases.', 55.00, 11400.00, 'Liquid', '3 hours'),
('Herbicide Application', 'Selective herbicide application to control unwanted vegetation.', 70.00, 51700.00, 'Liquid', '2 hours 45 minutes'),
('Insecticide Application', 'Targeted insecticide spraying to eliminate pests.', 65.00, 2600.00, 'Liquid', '3 hours'),
('Crop Protection Service', 'Comprehensive crop protection services including pest and disease management.', 75.00, 7800.00, 'Granular', '5 hours'),
('Growth Regulator Application', 'Application of growth regulators to enhance plant growth and yield.', 80.00, 9000.00, 'Liquid', '4 hours');



select * from drone_spraying_services;

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    part_id INT,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_address TEXT NOT NULL,
    contact_number VARCHAR(15) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (part_id) REFERENCES drone_parts(part_id)
);
select * from orders;
ALTER TABLE orders
ADD COLUMN part_name varchar(250),
ADD COLUMN shipping_date DATE;

DELETE FROM orders WHERE order_id = 4;
ALTER TABLE orders
CHANGE COLUMN total_price price VARCHAR(255);