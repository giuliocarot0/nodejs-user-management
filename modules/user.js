
var sql = require('./db.js');
//implementing user methods
    function getUser (user, pass, mail, callback) {
        if(user){
            querystring = "SELECT * FROM user WHERE username = ? AND password = SHA1(?)";
            queryobj = [user.replace(/\s+/g, ''), pass];
        }
        else{
            querystring = "SELECT * FROM user WHERE email = ? AND password = SHA1(?)";
            queryobj = [mail.replace(/\s+/g, ''), pass];
        }
        sql.query(querystring, queryobj, (err, res) => {
            if(err) callback(err, null);
            else{
                console.log(res.length);
                if (res.length > 0){
                    let user = {
                        id: res[0].iduser,
                        username: res[0].username,
                        type: res[0].type,
                        scopes: res[0].scopes
                    }
                    callback(null, user);
                }
                else callback(null, null);
            }
        });
    };

    //Add a new user to database
    function createUser(user, callback){
        console.log(JSON.stringify(user.scopes));
        sql.query("INSERT INTO user (username, password, type, scopes) VALUES (?, SHA1(?), ?, ?, ?)", [user.username.replace(/\s+/g, ''), user.password, user.type, JSON.stringify(user.scopes), user.email.replace(/\s+/g, '')], (err) => {
            if (err) callback(err);
            else callback(null);
        });
    };
module.exports = {getUser, createUser};