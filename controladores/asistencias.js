let asistencia = require("../modelos/asistencia.js");

exports.cerrarJornada = function(req, res)
{
	const datos = {
		type : 'exit',
		date : req.body.date,
		watchers_id : req.body.watchers_id,
		workers_id : req.body.workers_id,
		work_time_id: req.body.work_time_id,
		latitude: 1,
		longitude: 1
	};

	 asistencia.cerrar(datos,function(error, data)
	{
		if(!data && !data.insertId){
			res.status(500).json({"msg":"Algo ocurrio"});
		}else{
			res.status(200).json(data);
		}
	});
};
