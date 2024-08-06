const express = require('express')
const router = express.Router()
const connection = require('../Mysql/mysql');
const add_request = require('../Controllers/request_controller');
const book_now = require('../Controllers/book_now_controller');

router.post('/addrequest',add_request)

router.post('/booknow',book_now)


module.exports = router;