const usuario = require("../modelos/usuario.js")
const base64 = require("base-64")
const fs = require('fs')
const fetch = require('node-fetch')

exports.imagen = async (req, res) =>
{
    try{

        let uuid = req.params.uuid

        let imagen = await fetch('http://api.cs100.cl/v1/workers/face/'+uuid)
        .then(res => {
            let dest = fs.createWriteStream('./img.png');
            return base64.encode(res.buffer())
        })
        .catch(error => console.log(error))

        res.status(200).json({"img": imagen})
    }
    catch(err){
        res.status(500).json({"msg": "Hay un error"})
    }
}