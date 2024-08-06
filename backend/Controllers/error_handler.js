const express = require('express');

const error_handler = function (error, req, res, statusCode) {
    res.status(statusCode).set({
        "Content-Type": "application/json"
    });

    if (statusCode === 500) {
        res.json({
            "message": "Something went wrong"
        });
    } else {
        res.json({
            "message": error
        });
    }
};

module.exports = error_handler;
