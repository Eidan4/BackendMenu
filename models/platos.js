const { Schema, model } = require('mongoose');
const { config } = require('../database/config')

const PlatosSchema = Schema({
    name:{
        type: String,
        require: [true, 'Name is required']
    },
    description: {
        type: String,
        require: [true, 'Description is required']
    },
    alerts: {
        type: String,
        require: [true, 'Alerts is required']
    },
    prices: {
        type: Number,
        require: [true, 'Prices is required']
    },
    archivo: [{
        type: String,
        require: [true, 'Images is required']
    }],
    state: {
        type: Boolean,
        default:false
    },
    url:[{
        type: String,
        require: [true, 'url is required']
    }],
    category:{
        type: String,
        require: [true, 'category is required']
    }
});


PlatosSchema.methods.toJSON = function() {
    const { __v, _id, ...platos } = this.toObject();
    platos.uid = _id;
    
    return platos;
};

module.exports = model ('Platos',PlatosSchema);