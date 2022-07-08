const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://angelaltarodri:Dios_gent123@cluster0.cuzpd.mongodb.net/piratas?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(()=>console.log("Conexión con DB exitosa."))
    .catch(err=>console.log("No se pudo conectar con la DB debido a " + err));


// const dbobject = mongoose.connection

// dbobject.on('connected', ()=>{console.log('mongo DB connection successfull')})
// dbobject.on('error', ()=>{console.log('MongoDB connection failed')})
//this last line got me confused
// module.exports = mongoose