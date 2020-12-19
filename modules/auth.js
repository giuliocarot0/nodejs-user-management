const jwt = require("jsonwebtoken");


function generateToken(user){
    if(!user) return null;
    return token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: 60*60*24 /* 24h */});
};

function verifyToken(token, callback){

    jwt.verify(token,process.env.JWT_SECRET, (err, usr) => {
        if(err) callback(err,null);
        else callback(null, usr);
    })
};

function middleware(req, res, next){
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
};
module.exports = {generateToken, verifyToken, middleware};