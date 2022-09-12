const { response } = require("express");

const Mesa = require('../models/mesa');
const User = require('../models/user');


const createMesa = async (req, res = response) => {
    const name = req.body.name;
    const {location,meseros} = req.body;

    for (let i = 0; i < meseros.length; i++) {

        const mesero = await User.findById(meseros[i]);

        if(!mesero){
            return res.status(404).json({
                msg:`Meseros with the id --${meseros[i]}-- is not registered`
            });
        }
    }

    const mesa = new Mesa({name,location,meseros});

    await mesa.save();

    const mesa2 = await Mesa.findById(mesa.id)
    
    res.json(
        mesa2
    );
}

const getMesa = async (req, res= response) => {
    const [total, mesa] = await Promise.all([
        Mesa.count(),
        Mesa.find()
    ]);
    res.json({total, mesa})


}

const updateMesa = async (req, res) => {
    const {id} = req.params;

    if(id){
        let ids = Mesa.findById(id);
        if(!ids){
            res.status(404).json({
                msg: 'No se encontro ese ID de Mesa'
            })
        }
    }

    const {name,location,meseros} = req.body;

    if(meseros){
        for (var i = 0; i < meseros.length; i++) {

            const mesero = await User.findById(meseros[i]);
    
            if (!mesero) {
                return res.status(401).json({
                    msg: `Operator with the id ---${meseros[i]}--- is not registered`
                });
            }
        }
    }

    const mesa = await Mesa.findByIdAndUpdate(id, {name,location,meseros},{new: true});
    res.json({
        mesa
    });
}

const deleteMesa = async (req, res = response) => {
    const {id} = req.params;

    if(id){
        let ids = Mesa.findById(id);
        if(!ids){
            res.status(404).json({
                msg: 'No se encontro ese ID de Mesa'
            })
        }
    }

    const mesas = await Mesa.findByIdAndDelete(id);

    res.json({
        mesas
    });
}

module.exports ={
    createMesa,
    getMesa,
    updateMesa,
    deleteMesa
}