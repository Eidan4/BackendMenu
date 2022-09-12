const { Schema, model } = require('mongoose');

const NotificationSchema = Schema({
    Pedido:[{
        type:Schema.Types.ObjectId,
        ref: 'Order',
        required: false
    }],
    state:{
        type:Boolean,
        required: false,
        default: false
    },
    lugar_de_entrega:{
        type:String,
        required: false,
        default: 'Despacho'
    },
    msg: {
        type:String,
        required: false,
        default: 'Tu pedido ya esta, por favor recogerlo'
    }
})

NotificationSchema.methods.toJSON = function() {
    const { __v, _id, ...notification } = this.toObject();
    notification.uid = _id;
    
    return notification;
};

module.exports = model('Notification', NotificationSchema );