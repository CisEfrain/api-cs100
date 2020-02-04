let tarea = require("../modelos/tarea.js");

exports.getTrabajador = function(req, res)
{
	 tarea.getTrabajador(req.params.worker,function(error, data)
	{
		//si existe 
		if (typeof data !== "undefined" && data.length > 0){
			res.status(200).json(data);
		}else{
			res.status(404).json({"msg":"No hay registro en la base de datos"});
		}
	});
};
