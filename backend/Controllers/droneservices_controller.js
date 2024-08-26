const express = require('express')
const connection = require('../Mysql/mysql')
const error_handler = require('../Controllers/error_handler')


const add_service = function (req, res) {
    const {service_name, description, area_covered, price, filled_type, duration } = req.body;

    const insert_service_query = `
        INSERT INTO drone_spraying_services (service_name, description, area_covered, price, filled_type, duration) 
        VALUES (?, ?, ?, ?,?,?);
    `;

    connection.query(insert_service_query, [service_name, description, area_covered, price, filled_type, duration], function (err, results) {
        if (err) {
            return error_handler(err, req, res, 400);
        } else {
            res.set({
                "Content-Type": "application/json"
            });
            res.statusCode = 201;
            res.send({ "message": "Service Created successfully" });
        }
    });
};

const get_drone_services = function (req, res) {
    const get_service_query = "SELECT * FROM drone_spraying_services ;  ";
    connection.query(get_service_query, function (error, results) {
        if (error) {
            console.error('Error while querying the database:', error);
            res.statusCode = 400;
            res.send({ "message": "There is an error while querying the database" });
        } else {
            if (results.length) {
                const response_body = results;
                res.set({ "Content-Type": "application/json" });
                res.statusCode = 200;
                res.send(response_body);
            } else {

                res.send({ "message": "No Services" });
            }
        }
    });
}

const delete_service = function (req, res) {
    const service_id = req.params.service_id;

    const delete_query = "DELETE FROM drone_spraying_services WHERE service_id = ?";
    connection.query(delete_query, [service_id], function (error, results) {
        if (error) {
            return error_handler("there is an error while deleting the book", req, res, 400);
        } else {
            if (results.affectedRows === 0) {
                res.statusCode = 404;
                res.send({ "message": "Service  not found" });
            } else {
                res.set({ "content-type": "application/json" });
                res.statusCode = 200;
                res.send({ "message": "Service  deleted successfully" });
            }
        }
    });
}

const update_service = function (req, res) {
    const service_id = req.params.service_id;
    const { service_name, description, area_covered, price, filled_type, duration } = req.body;

    const update_service_query = `
        UPDATE drone_spraying_services
        SET 
            service_name = ?, 
            description = ?, 
            area_covered = ?, 
            price = ?, 
            filled_type = ?, 
            duration = ?
        WHERE service_id = ?;
    `;

    connection.query(update_service_query, [service_name, description, area_covered, price, filled_type, duration, service_id], function (err, results) {
        if (err) {
            return error_handler(err, req, res, 400);
        } else {
            if (results.affectedRows === 0) {
                res.statusCode = 404;
                res.send({ "message": "Service not found" });
            } else {
                res.set({ "content-type": "application/json" });
                res.statusCode = 200;
                res.send({ "message": "Service details updated successfully" });
            }
        }
    });
};

module.exports = {
    add_service,
    get_drone_services,
    delete_service,
    update_service
};