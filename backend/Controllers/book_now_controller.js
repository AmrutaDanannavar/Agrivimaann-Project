const express = require('express')
const connection = require('../Mysql/mysql')
const error_handler = require('../Controllers/error_handler')


const book_now = function (req, res) {
    const { customer_name, email, phone,  service_type,drone_model,booking_date,location } = req.body
    if (customer_name == null || email == null ||  phone == null || service_type == null|| drone_model== null|| booking_date==null||location==null) {
        return error_handler("all fields are required", req, res, 404);
    }
    // valid email format (example@example.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return error_handler("Invalid email format", req, res, 400);
    }

    //validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        return error_handler("Invalid phone number format", req, res, 400);
    }
    const book_now_query = "insert into BookNow  set customer_name=?, email=?, phone=?,  service_type=?,drone_model=?,booking_date=?,location=? ";
    const user_details = req.body
    connection.query(book_now_query, [user_details.customer_name, user_details.email, user_details.phone,user_details.service_type, user_details.drone_model, user_details.booking_date,  user_details.location], function (err1, results1) {
        if (err1) {
            error_handler(err1, req, res, 400)
        } else {
            res.set({
                "content-type": "application/json"
            })
            res.statusCode = 201
            response_body = {
                "message": "booking conform"
            }
            res.send(response_body)
        }

    })
}




module.exports = book_now