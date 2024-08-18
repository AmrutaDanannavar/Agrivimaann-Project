const express = require('express')
const connection = require('../Mysql/mysql')
const error_handler = require('../Controllers/error_handler')




const add_pilot = function (req, res) {
    const { license_number } = req.body;

    // Check if the pilot with the given license number already exists
    const pilot_exists_query = "SELECT * FROM Pilots WHERE license_number = ?;";
    connection.query(pilot_exists_query, [license_number], function (err, results) {
        if (err) {
            return error_handler(err, req, res, 400);
        }
        if (results.length > 0) {
            return error_handler("The pilot with this license_number already exists", req, res, 400);
        } else {
            // If file is uploaded, get the file path
            const photo = req.file ? req.file.path : null;

            const add_pilot_query = "INSERT INTO Pilots SET pilot_name = ?, license_number = ?, experience_level = ?, contact_number = ?, email = ?, status = ?, photo = ?";
            const pilot_details = req.body;

            // Include the photo path in the query
            connection.query(add_pilot_query, [
                pilot_details.pilot_name,
                pilot_details.license_number,
                pilot_details.experience_level,
                pilot_details.contact_number,
                pilot_details.email,
                pilot_details.status,
                photo
            ], function (err1, results1) {
                if (err1) {
                    return error_handler(err1, req, res, 400);
                } else {
                    res.set({
                        "content-type": "application/json"
                    });
                    res.statusCode = 201;
                    const response_body = {
                        "message": "A new pilot is added"
                    };
                    res.send(response_body);
                }
            });
        }
    });
};

const get_pilot = function (req, res) {

    const get_pilot_query = "SELECT * FROM Pilots ;  ";
    connection.query(get_pilot_query, function (error, results) {
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

                res.send({ "message": "No Pilots" });
            }
        }
    });
}

const delete_pilot = function (req, res) {
    const id = req.params.id;

    const delete_query = "DELETE FROM Pilots WHERE id = ?";
    connection.query(delete_query, [id], function (error, results) {
        if (error) {
            return error_handler("there is an error while deleting the book", req, res, 400);
        } else {
            if (results.affectedRows === 0) {
                res.statusCode = 404;
                res.send({ "message": "Pilots  not found" });
            } else {
                res.set({ "content-type": "application/json" });
                res.statusCode = 200;
                res.send({ "message": "Pilot  deleted successfully" });
            }
        }
    });
}

// Update pilot details
const update_pilot = function (req, res) {
    const id = req.params.id;
    const { pilot_name, license_number, experience_level, contact_number, email, status } = req.body;

    const update_pilot_query = `
        UPDATE Pilots SET    pilot_name = ?,   license_number = ?,   experience_level = ?,  contact_number = ?,  email = ?,   status = ?  WHERE id = ?;
    `;

    connection.query(update_pilot_query, [pilot_name, license_number, experience_level, contact_number, email, status, id], function (err, results) {
        if (err) {
            return error_handler(err, req, res, 400);
        } else {
            if (results.affectedRows === 0) {
                res.statusCode = 404;
                res.send({ "message": "Pilot not found" });
            } else {
                res.set({ "content-type": "application/json" });
                res.statusCode = 200;
                res.send({ "message": "Pilot updated successfully" });
            }
        }
    });
};

module.exports = {
    add_pilot,
    get_pilot,
    delete_pilot,
    update_pilot
};

