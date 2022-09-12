const { response } = require("express");

const Orden = require('../models/order');

const createOrden = async (req, res= response) => {
    try {
        const {platos,mesa,telephone,state,total} = req.body;

        const ordenes = new Orden({platos,mesa,telephone,state,total});

        await ordenes.save();
        
        const verordenes = await Orden.findById(ordenes.id);

        res.json(verordenes);
    } catch (error) {
        res.status(404).json({message:"No se pudo crear la orden"})
    }
}


const gerOrden = async (req, res=response) => {
    const ordenes = await Orden.find()
    res.json(ordenes);
}

const getOrdenId = async (req, res= response) => {
    const {id} = req.params;

    if(id){
        let ids = Orden.findById(id);
        if(!ids){
           return res.status(404).json("No se encontro ninguna orden");
        }
    }

    const ordenes = await Orden.findById(id)

    res.json(ordenes); 

}

const updateOrden = async (req, res=response) => {
    const {id} = req.params;
    const {platos,mesa,telephone,state,total} = req.body;

    if(id){
        let ids = Orden.findById(id);
        if(!ids){
            return res.status(404).json("No se encontro esta Orden")
        }
    }

    try {
        const ordenes = await Orden.findByIdAndUpdate(id,{platos,mesa,telephone,state,total},{new:true})
        res.json(ordenes)
    } catch (error) {
        res.status(404).json("Ocurrio un error no se pudo actualizar esta orden");
    }
}

const deleteOrden = async (req, res= response) => {
    try {
        const {id} = req.params;

        if(id){
            let ids = Orden.findById(id);
            if(!ids){
                return res.status(404).json("No se encontro esta Orden")
            }
        }


        const category = await Orden.findOneAndDelete(id)
        res.json(category);

    } catch (error) {
        res.status(404).json("Ocurrio un error y no se pudo eliminar esta orden");
    }
}

module.exports = {
    createOrden,
    gerOrden,
    getOrdenId,
    updateOrden,
    deleteOrden
}