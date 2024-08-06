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

insert into pilots (name, license_number, phone_number) VALUES 
('Pilot One', 'LIC123', 'pilotone@example.com'),
('Pilot Two', 'LIC456', 'pilottwo@example.com');

select * from pilots;

create  table tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    pilot_id INT,
    task_description TEXT NOT NULL,
    due_date DATE,
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pilot_id) REFERENCES pilots(pilot_id)
);

insert into tasks (pilot_id, task_description, due_date, status) VALUES 
(1, 'Inspect drone parts', '2024-09-20', 'Pending'),
(2, 'Train new pilots', '2024-09-25', 'In Progress');

select * from tasks;


create table drone_parts (
    part_id INT AUTO_INCREMENT PRIMARY KEY,
    part_name VARCHAR(100) NOT NULL,
    part_type ENUM('Propeller', 'Battery', 'Controller') NOT NULL,
    quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into drone_parts  (part_name, part_type, quantity) VALUES 
('Propeller A', 'Propeller', 10),
('Battery B', 'Battery', 20),
('Controller C', 'Controller', 5);

select * from drone_parts;

create table  drone_spraying_services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    acres FLOAT NOT NULL,
    filled_type VARCHAR(50) NOT NULL,
    assigner VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
insert into drone_spraying_services (acres, filled_type, assigner) VALUES 
(50.5, 'Liquid', 'John Doe'),
(20.0, 'Granular', 'Jane Smith');

select * from drone_spraying_services;

create table drone_parts_orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    part_id INT,
    quantity INT NOT NULL,
    order_date DATE,
    FOREIGN KEY (part_id) REFERENCES drone_parts(part_id)
);

insert into drone_parts_orders (part_id, quantity, order_date) VALUES 
(1, 5, '2024-08-01'),
(2, 10, '2024-08-02');

select * from drone_parts_orders; 