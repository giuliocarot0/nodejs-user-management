const mysql = require("mysql");

var connection = mysql.createConnection({
	host : '172.21.0.30',
	user : 'admin',
	password : 'Luigina1971.1',
	database : 'auth'
});

connection.connect( (err) => {if(err) throw err});
module.exports = connection;