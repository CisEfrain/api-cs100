const DB = require('./db.js');

var tarea = {};

tarea.getTrabajador = function(id, callback)
{
	var q = 'SELECT * FROM tasks WHERE worker_id = ? ORDER BY date desc ';

	DB.getConnection(function(err, connection)
	{
		connection.query(q, id,  function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();

		});

	  
	});
}

module.exports = tarea;