const DB = require('./db.js');

var asistencia = {};

asistencia.cerrar = function(datos, callback)
{
	var q = 'INSERT INTO assistances SET ?';

	DB.getConnection(function(err, connection)
	{
		connection.query(q, datos,  function(err, result){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null,{"insertId" : result.insertId}); 

		  	connection.release();

		});

	  
	});
}

module.exports = asistencia;