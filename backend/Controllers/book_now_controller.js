const express = require('express')
const connection = require('../Mysql/mysql')
const error_handler = require('../Controllers/error_handler')


const book_now = function(req,res){
    const booking_id = req.body.booking_id
   const booking_id_exists_query = "select * from book_now where booking_id=?;"
   connection.query(booking_id_exists_query,[booking_id],function(err,results){
    if(err){
        error_handler(err,req,res,400)
    }
    if(results.length>0){
        error_handler("The drone is already booked with this id ",req,res,400)
    }else{
        const book_now_query = "insert into book_now set full_name=?,email=?,phone_number=?,drone_model=?,booking_date=?,booking_time=?,duration=?,location =?";
        const user_details = req.body
        connection.query(book_now_query,[user_details.full_name,user_details.email,user_details.phone_number,user_details.drone_model,user_details.booking_date,user_details.booking_time,user_details.duration,user_details.location],function(err1,results1){
            if(err1){
               error_handler(err1,req,res,400)
            }else{
                res.set({
                    "content-type":"application/json"
                })
                res.statusCode = 201
                response_body= {
                    "message":"booking conform"
                }
                res.send(response_body)
            }

        })
    }

   })
}

module.exports = book_now