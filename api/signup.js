const userlib = require("../modules/user");
module.exports = (app, auth) => {
    app.post('/auth/signup', (req, res) =>{
        userlib.createUser(req.body, (e) => {
            if(e) {
                if(e.errno == 1062) res.status(400).json({
                    "error":true,
                    "type":-123,
                    "message":"Duplicated User"
                })
                return res.status(400).json(e);
            }
            else {
                userlib.getUser(req.body.username, req.body.password, (e,u)=>{
                    if (e) return res.status(500).json({
                        error: true,
                        type: "Internal Server Error",
                        message: "Cannot read user infos from database"
                    });
                    if(!e && !u) return res.status(403).json({
                        error: true,
                        type: "Unauthorized",
                        message: "Prompted user not found"
                    });
                    else
                        //handle successful login
                        login(u);
                });
                
                var login = (u) => {
                    const token = auth.generateToken(u);
                    //forse non necessario, posso tornare direttamente u?
                    //const userObj = user.getObject(u);
                    return res.json({user: u, token: token});
                }; 
            }
        });
    });
}