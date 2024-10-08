const express = require('express');
const cors = require('cors');
const app = express();
const routes = require ('./Routes/route');
const path = require('path');

PORT = 4001;
app.use(cors());
app.use(express.json());
app.use('/api',routes);

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen("4001",function(err){
    if(err){
        console.log("There is an error")
    }else{
        console.log("Server is running at port" +  PORT );
    }
})