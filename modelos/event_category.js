const DB = require('./db.js');

var eventCategory = {};

eventCategory.getAll= function(id, callback)
{
	var q = 'SELECT * FROM event_category';

	DB.getConnection(function(err, connection)
	{
		connection.query(q, id,  function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();

		});

	  
	});
}

module.exports = eventCategory;