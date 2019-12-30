let DB = require('./db.js');

let usuario = {};

usuario.getOne = function(id, callback)
{
	var q = 'SELECT * FROM workers WHERE id = ?';

	DB.getConnection(function(err, connection)
	{
		connection.query( q, id,  function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();
	  	
		});

	  
	});
}

module.exports = usuario;