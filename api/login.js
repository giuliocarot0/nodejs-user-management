//creating a login handler
const userlib = require("../modules/user");
module.exports = (app, auth) => {
    //login request  route
    app.post('/auth/login', (req,res) => {
        user = req.body.username;
        mail = req.body.email;
        pass = req.body.password;
        //checks request fields
        if((!user && !mail) || !pass){
            return res.status(400).json({
                error: true,
                type: "Bad Request",
                message: "Check your auth request form"
            });
        }
        //verify user 
        userlib.getUser(user, pass, mail, (e,u) => {
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

    });

};