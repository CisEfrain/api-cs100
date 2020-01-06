let node_env = process.env.NODE_ENV || 'desarrollo'

let config = {
    "produccion" : {
        "servidor" : "Produccion",
        "puerto" : "4000",
        "db" : {
            connectionLimit : 10,
            host: '149.28.183.170',
            user: 'condo',
            password: 'Clave@segura5000!!!',
            database: 'ccdb'
        }
    },
    "desarrollo" : {
        "servidor" : "Desarrollo",
        "puerto" : "3000",
        "db" : {
            connectionLimit : 10,
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'ccdb'
        }
    }
}


module.exports = config[node_env];