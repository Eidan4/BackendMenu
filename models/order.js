const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const connection = mongoose.createConnection(process.env.MONGODB_ATLAS);
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

const OrderSchema = Schema({
    Nro_Orden: {
        type: Number,
        required: false,
        default: 0
    },
    platos:[
        {
            plato:{
                type:Schema.Types.ObjectId,
                ref: 'Platos',
                required:[true, 'Mesero is required'],
                autopopulate:{'select':'name prices'}
            },cantidad:{
                type:Number,
                required: [true,'Cantidad is required'],
                default: 1,
            }
        }
    ],
    mesa:{
        type:Schema.Types.ObjectId,
        ref:'Mesa',
        // required:[true, 'Mesa is required'],
        autopopulate:{'select':'name'}
    },
    telephone:{
        type: String,
        required: [true, 'Telephone is required']  
    },
    state:{
        type:Boolean,
        require:false,
        default:false
    },
    total:{
        type:Number,
    }
},{ timestamps: { createdAt: 'created_at'} });

OrderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'Nro_Orden',
    startAt: 0000,
    incrementBy: 1,
});

OrderSchema.plugin(require('mongoose-autopopulate'));

OrderSchema.methods.toJSON = function() {
    const { __v, _id, ...order } = this.toObject();
    order.uid = _id;
    
    return order;
};

module.exports = model('Order', OrderSchema );