const mysql = require('mysql2');


var connection  = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user:'root',
    password :'amu26',
    database : 'agrivimaan'
});

module.exports = connection