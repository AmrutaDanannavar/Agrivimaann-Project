const express = require('express')
const connection = require('../Mysql/mysql')
const error_handler = require('../Controllers/error_handler')

const add_drone_part = function (req, res) {
    const { part_name, part_type, stock_quantity, price } = req.body;
    const image_path = req.file ? req.file.path.replace(/\\/g, '/') : null; // Replace backslashes with forward slashes

    if (!part_name || !part_type || !stock_quantity || !price || !image_path) {
        return res.status(400).send({ message: "All fields are required." });
    }

    const insert_part_query = `
        INSERT INTO drone_parts (part_name, part_type, stock_quantity, price, image_path)
        VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(
        insert_part_query,
        [part_name, part_type, stock_quantity, price, image_path],
        function (error, results) {
            if (error) {
                console.error('Error while inserting into the database:', error);
                return res.status(500).send({ message: "Database error." });
            }

            res.status(201).send({ message: "Drone part added successfully.", partId: results.insertId });
        }
    );
};

const get_drone_parts = function (req, res) {
    const get_parts_query = "SELECT * FROM drone_parts;";

    connection.query(get_parts_query, function (error, results) {
        if (error) {
            console.error('Error while querying the database:', error);
            return res.status(500).send({ message: "Database error." });
        }

        if (results.length) {
            res.status(200).json(results);
        } else {
            res.status(404).send({ message: "No drone parts found." });
        }
    });
};


module.exports = {
    get_drone_parts,
    add_drone_part
};