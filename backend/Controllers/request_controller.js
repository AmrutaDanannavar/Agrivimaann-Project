const express = require('express')
const connection = require('../Mysql/mysql')
const error_handler = require('../Controllers/error_handler')


const add_request = function(req,res){
    const email = req.body.email
   const user_exists_query = "select * from requests where email=?;"
   connection.query(user_exists_query,[email],function(err,results){
    if(err){
        error_handler(err,req,res,400)
    }
    if(results.length>0){
        error_handler("The request  is already there",req,res,400)
    }else{
        const addrequest_query = "insert into requests set name=?,email=?,phone=?,message =?,detailsfor=?";
        const user_details = req.body
        connection.query(addrequest_query,[user_details.name,user_details.email,user_details.phone,user_details.message,user_details.detailsfor],function(err1,results1){
            if(err1){
               error_handler(err1,req,res,400)
            }else{
                res.set({
                    "content-type":"application/json"
                })
                res.statusCode = 201
                response_body= {
                    "message":"A new  request is added "
                }
                res.send(response_body)
            }

        })
    }

   })
}

module.exports = add_request