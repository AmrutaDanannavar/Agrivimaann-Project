const express = require('express');
const connection = require('../Mysql/mysql')
const error_handler = require('../Controllers/error_handler');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'MY_SECRET_FOR_FSD_PROJECT';

const login = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    // Check if email and password are provided
    if (!email || !password) {
        return error_handler("Email and password are required", req, res, 400);
    }
    
    // Query to check if the user exists
    const user_exists_query = "SELECT * FROM Admin WHERE email = ?";
    connection.query(user_exists_query, [email], function (err, results) {
        if (err) {
            return error_handler(err, req, res, 400);
        }

        if (results.length > 0) {
            const user = results[0];

            if (password === user.password) {
                res.statusCode = 200;
                res.set({
                    "Content-Type": "application/json"
                });

                // Generating JWT
                const payload = {
                    "user_id": user.id,
                    "email_id": user.email
                };
                const jwt_token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

                const response = {
                    
                        "message": "Login is successful, enjoy",
                        "user_token": jwt_token,
                        "username": user.username, // Add username to the response
                };
                res.send(response);
            } else {
                error_handler("Email Address/Password is incorrect", req, res, 400);
            }
        } else {
            error_handler("Email Address/Password is incorrect", req, res, 400);
        }
    });
};

module.exports = login;
