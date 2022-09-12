const { Schema, model } = require('mongoose');

const MesaSchema = Schema({
    name:{
        type: String,
        required: [true , 'Name is required']
    },
    location:{
        type: String,
        required: false
    },
    meseros:[{
        type:Schema.Types.ObjectId,
        ref: 'User', 
        required:[true, 'Mesero is required'],
        autopopulate:{'select':'name'}
    }]
});

MesaSchema.plugin(require('mongoose-autopopulate'));

MesaSchema.methods.toJSON = function() {
    const { __v, _id, ...mesa } = this.toObject();
    mesa.uid = _id;
    
    return mesa;
};

module.exports = model('Mesa', MesaSchema );
