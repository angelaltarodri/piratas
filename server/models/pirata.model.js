const mongoose = require('mongoose');

const EsquemaPirata = new mongoose.Schema({
    nombre: {
        type:String,
        required: [true, "Nombre es obligatorio."],
        minLength: [2, "Nombre debe tener al menos dos caracteres."]
    },
    imagen: {
        type:String,
        required: [true, "Imagen es obligatoria."],
        minLength: [2, "Imagen debe tener al menos dos caracteres."],
    },
    tesoros: {
        type:Number,
        required: [true, "Número de tesoros es obligatoria."],
        minLength: [0, "El número de tesoros debe ser de 0 a más."]
    },
    frase: {
        type:String,
        required: [true, "La frase del pirata es obligatorio."],
        minLength: [3, "La frase del pirata debe tener al menos tres caracteres."],
    },
    posicion: {
        type:String,
        required: [true, "La frase del pirata es obligatorio."]
    },
    patapalo: {
        type: Boolean,
        required: [true, "Si tiene pata de palo es obligatorio saber."],
        default: false
    },
    parcheojo: {
        type: Boolean,
        required: [true, "Si tiene parche en el ojo es obligatorio saber."],
        default: false
    },
    garfio: {
        type: Boolean,
        required: [true, "Si tiene garfio en vez de mano es obligatorio saber."],
        default: false
    },
}, {timestamps: true, versionKey: false});

const Pirata = mongoose.model("pirata", EsquemaPirata);

module.exports = Pirata;