require("dotenv").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const port = 9000;
const cors = require("cors");
const auth = require("./modules/auth");
const bodyParser = require("body-parser");
const db = require("./modules/db");
//const api = require("./api");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//create a middleware to check incoming requests  
app.use(function(req, res, next){
    //get the token from request header
    var token = req.headers['authorization'];
    //console.log("Checking incoming request");
    
    //the middleware check if token is valid or not
    //if not present then following route will take care of it
    if(!token) return next();

    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        //callback to manage verify results
        if(err) {
            return res.status(401).json({
                error: true,
                type: "Bad Authorization",
                message: "Invalid Token"
            });
        }
        else{
            //if token ok, then middlware insert user infos into request header. Next route will take care of it
            req.user = user;
            next();
        }
    });
});

require('./api/login')(app, auth);
require('./api/signup')(app, auth);
require('./api/scopes')(app);


app.listen(1000, '0.0.0.0', () => {
    console.log("server listenting on port" +port)
})
