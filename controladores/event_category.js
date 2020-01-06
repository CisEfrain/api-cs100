let eventCategory = require("../modelos/event_category");

exports.getAll = function(req, res)
{
	eventCategory.getAll(req.params.worker,function(error, data)
	{
		//si existe 
		if (typeof data !== "undefined" && data.length > 0){
			res.status(200).json(data);
		}else{
			res.status(404).json({"msg":"No hay registro en la base de datos"});
		}
	});
};
