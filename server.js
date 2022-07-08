const express = require('express')

const cors = require('cors')

const app = express()

//para usar JSON y obtener datos de la url 
app.use( express.json(), express.urlencoded( { extended:true } ));

//permitir accesar desde un origen distinto
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)

//iniciamos BD
require('./server/config/mongoose.config')

//importamos rutas
const misRutas = require('./server/routes/pirata.routes')
misRutas(app)

//ejecutamos el server
app.listen(8000, () => console.log("Servidor conectado con éxito."))