const PseSchema = require('../models/pse');
const { response } = require("express");


const CreatePse = async (req, res= response)=>{
    try {
        const {platos,nombre_usuario,email,cedula,telefono_celular,direccion,ciudad,estado,ValorTotal,divisa}= req.body;

        const pago = new Pse(platos,nombre_usuario,email,cedula,telefono_celular,direccion,ciudad,estado,ValorTotal,divisa);

        await pago.save();

        console.log(pago);
    } catch (error) {
        res.status(404).json({
            msg:"No se pudo hacer el pago"
        })
    }
}

module.exports={
    CreatePse
}