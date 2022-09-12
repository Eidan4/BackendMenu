const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const connection = mongoose.createConnection(process.env.MONGODB_ATLAS);
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

const PseSchema = Schema({
    platos:[{
        type:String,
        required: [true,'Orden is requires']
    }],
    nombre_usuario:{
        type:String,
        required: [true,'nombre_usuario is required']
    },
    email:{
        type:String,
        required: [true,'email is required']
    },
    cedula:{
        type:String,
        required: [true,'cedula is required']
    },
    telefono_celular:{
        type:String,
        required: [true,'telefono_celular is required']
    },
    direccion:{
        type:String,
        required: [true,'direccion is required']
    },
    ciudad:{
        type:String,
        required: [true,'ciudad is required']
    },
    estado: {
        type:String,
        required: [true,'estado is required']
    },
    identificador_compra:{
        type:Number,
        required: false,
        default:0
    },
    ValorTotal:{
        type:String,
        required: [true,'ValorTotal is required']
    },
    divisa:{
        type:String,
        required: [true,'divisa is required']
    }
})

PseSchema.plugin(autoIncrement.plugin,{
    model: 'Pse',
    field: 'identificador_compra',
    startAt: 0000,
    incrementBy: 1,
})

PseSchema.methods.toJSON = function() {
    const { __v, _id, ...pse } = this.toObject();
    pse.uid = _id;
    
    return pse;
}

module.exports = model('Pse',PseSchema);