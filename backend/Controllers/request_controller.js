const express = require('express')
const connection = require('../Mysql/mysql')
const error_handler = require('../Controllers/error_handler')


const add_request = function(req, res) {
    const { email } = req.body;

    
    const user_exists_query = "SELECT * FROM requests WHERE email = ?;";
    connection.query(user_exists_query, [email], function(err, results) {
        if (err) {
            return error_handler(err, req, res, 400);
        }
        if (results.length > 0) {
            return error_handler("The request is already there", req, res, 400);
        } else {
            const addrequest_query = "INSERT INTO requests SET name = ?, email = ?, phone = ?, message = ?, detailsfor = ?";
            const user_details = req.body;
            connection.query(addrequest_query, [user_details.name, user_details.email, user_details.phone, user_details.message, user_details.detailsfor], function(err1, results1) {
                if (err1) {
                    return error_handler(err1, req, res, 400);
                } else {
                    res.set({
                        "content-type": "application/json"
                    });
                    res.statusCode = 201;
                    const response_body = {
                        "message": "A new request is added"
                    };
                    res.send(response_body);
                }
            });
        }
    });
};

const get_requests = function(req, res) {
    
    const get_request_query = "select * from requests;  ";
    connection.query(get_request_query ,  function(error, results) {
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
               
                res.send({ "message": "No Requests" });
            }
        }
    });
}

module.exports = {
   add_request,
   get_requests
    
};